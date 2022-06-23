# DirectoryLocal

![DirectoryLocal](directorylocal.png)

Local Directory for Saving Files with LocalStorage.
With `DirectoryLocal`, you can write, read, copy, rename and remove files using `localStorage`.

`DirectoryLocal` is not recommended for apps/websites that keeps their cookie size as small as possible,
since characters are splitted.

```js
var dirname = "My Directory";
var dir = new DirectoryLocal(dirname);
var file = new File(["Hello, World"], "example.txt", { type: "text/plain" });

// save the file to the localStorage
dir.write(file);

// log the file content
console.log(dir.read("example.txt"));
```

# Installation

```html
<script src="https://cdn.jsdelivr.net/gh/dlvdls18/DirectoryLocal@main/src/directorylocal.js"></script>
```

# Documentations

## Constructor

```js
var dir = new DirectoryLocal("mydir");
                       // Directory Name
```

## Methods

|   Name    |                Arguments                    |             Description             |
|-----------|---------------------------------------------|-------------------------------------|
| `write`   | `Array File` or `File` : Files              | Save the file(s)                    |
| `read`    | `String` : Filename                         | Return the file content             |
| `copy`    | `String` : Filename, `String` : Destination | Copy the file                       |
| `rename`  | `String` : Filename, `String` : Destination | Rename the file                     |
| `remove`  | `String` : Filename                         | Delete the file                     |
| `destroy` | None                                        | Delete all the files from directory |
| `files`   | None                                        | Return all files from directory     |
| `url`     | `String` : Filename                         | Return Local URL of file content    |

## Others
### Change the directory

```js
dir.dirname = "mydir";
```

### Get all saved directories
```js
DirectoryLocal.directories();
```
