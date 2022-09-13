import puppeteer from "puppeteer";

class App {
  private static ROOT_PATH: string = "/tmp/";
  private static CLIENT_PATH: string =
    "https://kaibadash.github.io/puppeteer_native_file_system_api_sample/";
  private page: any;

  constructor() {
    this.init();
  }

  async init() {
    let browserConfig = {
      headless: false,
      devtools: true,
      args: [
        "--enable-blink-features=WebCodecs",
        "--enable-experimental-web-platform-features",
        "--file-handling-api",
        "--enable-features=MediaFoundationAsyncH264Encoding",
      ],
    };

    let pageViewport = {
      width: 800,
      height: 450,
      deviceScaleFactor: 1,
    };
    const browser = await puppeteer.launch(browserConfig);

    this.page = await browser.newPage();
    this.page.setViewport(pageViewport);
    await this.page.goto(App.CLIENT_PATH);

    let futureFileChooser = await this.page.waitForFileChooser();
    await new Promise((res) => setTimeout(res, 1000));
    await this.page.click("#execute");
    // TimeoutError: Waiting for `FileChooser` failed: 30000ms exceeded
    let fileChooser = await futureFileChooser;
    console.log("fileChooser = ", fileChooser);
    await fileChooser.accept(["/test.txt"]);
  }
}
new App();
