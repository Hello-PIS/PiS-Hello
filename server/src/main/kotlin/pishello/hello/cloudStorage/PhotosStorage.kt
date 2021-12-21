package pishello.hello.cloudStorage

import com.google.auth.Credentials
import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.storage.*
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import java.nio.file.Paths


@Component
class PhotosStorage {
    val projectId = "strong-compiler-334811"
    val bucketName = "pis2021"
    val secretPath = "secret.json"

    private fun storage(): Storage {
        val credentials: Credentials = GoogleCredentials.fromStream(ClassPathResource(secretPath).inputStream)
        return StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId(projectId)
            .build().service
    }

    private fun createNewBucket(bucketName: String): Bucket {
        val storage = StorageOptions.getDefaultInstance().service
        return storage.create(BucketInfo.of(bucketName))
    }

    fun write(name: String, content: String) {
        val storage = storage()
        val bucket = storage.get(bucketName)!!
        val bytes: ByteArray = content.toByteArray(Charsets.UTF_8)
        bucket.create(name, bytes)
    }

    fun read(name: String): String? {
        val storage = storage()
        val blob: Blob = storage[BlobId.of(bucketName, name)]
        return blob.getContent().toString(Charsets.UTF_8)
    }

    fun save(name: String, path: String) {
        val storage = storage()
        val blob = storage[BlobId.of(bucketName, name)]
        blob.downloadTo(Paths.get(path))
    }
}