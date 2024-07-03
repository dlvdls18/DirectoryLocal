/**
 * DirectoryLocal
 * License: MIT
 * (c) 2022 - dlvdls18
 * https://github.com/dlvdls18/DirectoryLocal/
 * 
 */

class DirectoryLocal {
  storage = window.localStorage;
  static directories(storage=window.localStorage) {
    var dirs = [];
    var m = /DirectoryLocal~(.+)@.+:\d+/;
    for(var i = 0; i < storage.length; i++) if(storage.key(i).match(m)) dirs.push(atob(storage.key(i).match(m)["1"]));
    return dirs;
  }
  constructor(name) {
    this.dirname = name;
    this.files = [];
  }
  directories() {
    var dirs = [];
    var m = /DirectoryLocal~(.+)@.+:\d+/;
    for(var i = 0; i < this.storage.length; i++) if(this.storage.key(i).match(m)) dirs.push(atob(this.storage.key(i).match(m)["1"]));
    return dirs;
  }
  use(storage) {
    this.storage = storage;
  }
  write(files) {
    if(!Array.isArray(files)) files = [files];
    var name = this.dirname;
    var storage = this.storage;
    files.forEach(async function(file) {
      if(storage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file.name) + ":1") != null) throw new Error("File already exist");
      var text = await file.text();
      var contents = [];
      var content = "";
      var count = 0;
      Array.from(text).forEach(function(char) {
        if(count == 200) {
          count = -1;
          contents.push(content);
          content = "";
        } else content += char;
        count += 1;
      });
      if(content != "") contents.push(content);
      var content_index = 1;
      contents.forEach(function(content) {
        storage.setItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file.name) + ":" + content_index, content);
        content_index += 1;
      });
    });
  }
  read(file) {
    var name = this.dirname;
    var text = "";
    var count = 1;
    var storage = this.storage;
    while(storage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count) != null) {
      text += storage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count);
      count += 1;
    }
    return text;
  }
  remove(file) {
    var name = this.dirname;
    var count = 1;
    var storage = this.storage;
    while(storage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count) != null) {
      storage.removeItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count)
    }
  }
  exist(file) {
    var storage = this.storage;
    return storage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":1") != null;
  }
  copy(file, dest, type) {
    var t = this.read(file);
    this.write(new File([t], dest, { type: type || "text/plain" }));
  }
  rename(file, dest, type) {
    var t = this.read(file);
    this.write(new File([t], dest, { type: type || "text/plain" }));
    this.remove(file);
  }
  destroy() {
    var name = this.dirname;
    var storage = this.storage;
    for(var i = 0; i < storage.length; i++) {
      var key = storage.key(i).substr(15, storage.key(i).length).split("@")[0];
      try {
        if(atob(key) == name) storage.removeItem(storage.key(i));
      } catch(e) {}
    }
  }
  files() {
    var name = this.dirname;
    var storage = this.storage;
    for(var i = 0; i < storage.length; i++) {
      var key = atob(storage.key(i).split(":")[1]);
      var fn = storage.key(i).substr(15, storage.key(i).length).split("@")[0];
      var files = [];
      try {
        if(atob(fn) == name) files.push(key);
      } catch(e) {}
    }
    return files;
  }
  url(file, type) {
    return Object.createObjectURL(new File([this.read(file)], file, { type: type || "text/plain" }));
  }
}
