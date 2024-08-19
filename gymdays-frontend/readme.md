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
