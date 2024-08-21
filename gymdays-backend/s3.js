import {
    PutObjectCommand,
    GetObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "node:crypto";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const randomImageName = () => crypto.randomBytes(32).toString("hex");

dotenv.config();
// AWS_ACCESS_KEY="AKIA2UC3FJYNFFIWGXK3"
// AWS_SECRET_ACCESS_KEY="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"
// AWS_BUCKET_REGION="eu-north-1"
// AWS_BUCKET_NAME="gymdays-backup-dev"
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey,
    },
});

// upload from s3
export async function uploadFile(file) {
    if (!file) {
        throw new Error("no file was given");
    }
    const randomName = randomImageName();
    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: randomName,
        ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(uploadParams);
    const res = await s3.send(command);
    console.log("response!!!", res);
    return randomName;
}

// download from s3

export async function getDownloadUrl(keyId = "") {
    const objectParams = {
        Bucket: bucketName,
        Key: keyId,
    };
    const command = new GetObjectCommand(objectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
}
