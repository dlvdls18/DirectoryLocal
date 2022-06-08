/**
 * DirectoryLocal
 * License: MIT
 * (c) 2022 - dlvdls18
 * https://github.com/dlvdls18/DirectoryLocal/
 * 
 */

class DirectoryLocal {
  constructor(name) {
    this.dirname = name;
    this.files = [];
  }
  write(files) {
    if(!Array.isArray(files)) files = [files];
    var name = this.dirname;
    files.forEach(async function(file) {
      if(localStorage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file.name) + ":1") != null) throw new Error("File already exist");
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
        localStorage.setItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file.name) + ":" + content_index, content);
        content_index += 1;
      });
    });
  }
  read(file) {
    var name = this.dirname;
    var text = "";
    var count = 1;
    while(localStorage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count) != null) {
      text += localStorage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count);
      count += 1;
    }
    return text;
  }
  remove(file) {
    var name = this.dirname;
    var count = 1;
    while(localStorage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count) != null) {
      localStorage.removeItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":" + count)
    }
  }
  exist(file) {
    return localStorage.getItem("DirectoryLocal~" + btoa(name) + "@" + btoa(file) + ":1") != null;
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
    for(var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i).substr(15, localStorage.key(i).length).split("@")[0];
      try {
        if(atob(key) == name) localStorage.removeItem(localStorage.key(i));
      } catch(e) {}
    }
  }
  files() {
    var name = this.dirname;
    for(var i = 0; i < localStorage.length; i++) {
      var key = atob(localStorage.key(i).split(":")[1]);
      var fn = localStorage.key(i).substr(15, localStorage.key(i).length).split("@")[0];
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