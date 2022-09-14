document.getElementById("execute").onclick = () => {
  console.log("clocked");
  let dirHandle = window.showDirectoryPicker();
  console.log(dirHandle);

  dirHandle.then(function (handle) {
    console.log(handle);

    handle
      .getDirectoryHandle(new Date().getTime(), {
        create: true,
      })
      .then(function (newDirectoryHandle) {
        console.log(newDirectoryHandle);

        newDirectoryHandle
          .getFileHandle("test.txt", { create: true })
          .then(function (sampleHandle) {
            console.log("test:", sampleHandle);

            sampleHandle.createWritable().then(function (writable) {
              writable.write("handle! It's " + new Date()).then(function (a) {
                console.log(a);
                writable.close();
              });
            });
          });
      });
  });
};
