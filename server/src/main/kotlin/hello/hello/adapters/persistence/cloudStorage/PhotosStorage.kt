package hello.hello.adapters.persistence.cloudStorage

import com.google.auth.Credentials
import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.storage.*
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import java.io.FileNotFoundException
import java.nio.file.Paths


@Component
class PhotosStorage {
    val bucketName = "pis2021"
    val secretPath = "secret.json"

    private fun storage(): Storage {
        val credentials: Credentials = try {
            GoogleCredentials.fromStream(ClassPathResource(secretPath).inputStream)
        } catch (e: FileNotFoundException) {
            val json = System.getenv("GCP_JSON")
            GoogleCredentials.fromStream(json.byteInputStream())
        }
        return StorageOptions.newBuilder()
            .setCredentials(credentials)
            .build().service
    }

    private fun createNewBucket(bucketName: String): Bucket {
        val storage = StorageOptions.getDefaultInstance().service
        return storage.create(BucketInfo.of(bucketName))
    }

    private fun write(name: String, content: ByteArray) {
        val storage = storage()
        val bucket = storage.get(bucketName)!!
        bucket.create(name, content)
    }

    private fun read(name: String): ByteArray? {
        val storage = storage()
        val blob: Blob? = storage[BlobId.of(bucketName, name)]
        return blob?.getContent()
    }

    fun writeText(name: String, content: String) {
        write(name, content.toByteArray(Charsets.UTF_8))
    }

    fun writeImage(name: String, content: ByteArray) {
        write(name, content)
    }

    fun readText(name: String): String? {
        return read(name)?.toString(Charsets.UTF_8)
    }

    fun readImage(name: String): ByteArray? {
        return read(name)
    }

    fun save(name: String, path: String) {
        val storage = storage()
        val blob = storage[BlobId.of(bucketName, name)]
        blob.downloadTo(Paths.get(path))
    }
}