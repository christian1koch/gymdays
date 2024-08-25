# To make a release
- Update in gymdays-frontend/app.json the version to the desired version
- Use the same version in Github add a tag and create a release with that tag



# Common Pitfalls

## Deploying

### Socket Problem

-   Read the error above
-   If its in dev mode, probably not in the same LAN, use hotspot if needed.

## Developing

-   Fetch API is weird and does not accept blobs.
-   To bypass this, if you want to use fetch + files, you have to do it in this format:
    ```js
    formData.append("file", {
    	name: file.name,
    	type: "application/x-sqlite3",
    	uri: pathToDb,
    } as any);
    ```

## Push Notifications Error
Fixed by adding the expo-notification package, more on it [here](https://github.com/expo/fyi/blob/main/apns-entitlement-sdk-51.md)