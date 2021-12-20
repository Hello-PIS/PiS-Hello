package pishello.hello.cloudStorage;

import com.google.cloud.storage.*;

import java.nio.file.Paths;
import java.util.HashMap;

public class PhotosStorage {
    
    public Bucket createNewBucket(String bucketName) throws Exception {
        Storage storage = StorageOptions.getDefaultInstance().getService();
        return storage.create(BucketInfo.of(bucketName));

    }

    public HashMap<String, String> downloadObject(String projectId, String bucketName, String objectName, String destFilePath) {
        // The ID of your GCP project
        // String projectId = "your-project-id";

        // The ID of your GCS bucket
        // String bucketName = "your-unique-bucket-name";

        // The ID of your GCS object
        // String objectName = "your-object-name";

        // The path to which the file should be downloaded
        // String destFilePath = "/local/path/to/file.txt";

        Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

        Blob blob = storage.get(BlobId.of(bucketName, objectName));
        blob.downloadTo(Paths.get(destFilePath));

        HashMap<String, String> map = new HashMap<>();
        map.put("objectName", objectName);
        map.put("bucketName", bucketName);
        map.put("Blob", blob.toString());
        return map;
    }

}