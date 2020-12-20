# TweetImagesAsFileConverter

This tool is writen by pure html and js and css.

This tool intend to exchange file on Twitter in 1 tweet with 4 images.

To work you need to prepare ES2017 SuportBlowser(Chromium,Chrome,Firefox,etc)

You can convert a file(max 6.9MB) to images (900*900 px png max 4files).
And you can convert these images to the file.

Support data encryption! algorism is AES256 GCM!

## Make Images to Tweet on Twitter
* Prepare 1 file which you want to exchage on twitter.
* Open demo page.
* Ckick "To Images"tab.
* Set the file to "File:". Then images automatically made.(if data is small,then images made less than 4.)
* Click images to download them.
* If the file is encrypted, you mast input valid password.

## Make The File from Tweeted Images
* Prepare 1~4 image files which download from Twitter.
* Open demo page.
* Ckick "To File"tab.
* If you want to encrypt the data, input password to pw form.
* Set the image files to "image1~4:". Then images automatically loaded.(if data is small,then images made less than 4.)
  * 1~4 Files valid order is required.
* You set need image files,Click "convertToFile"button to build and download The file.
  * if feed invalid image files or order, then you get invalid file or error.

## Make QRCode which conteins Url for TweetImagesAsFileConverter & Images Tweet Page

Adding QRCode tab, you can get screen shot and send others.
The QRCode conteins TweetImagesAsFileConverter page url & Tweet url which you inputed the QRCode Tab's input form.
Scan Received Screen Shot,then open this TweetImagesAsFileConverter page & show Tweet url which you inputed!
 * Open QRCode tab.
 * Cpoy and Past Url for Images Tweeted Page.
 * Then QRCode made. You send this QRCode to file Receiver. 
 * Receiver opne the QRCode url, then open TweetImagesAsFileConverter.
 * When to File tab has a Link to opne Images Tweeted Page in new tab.

## demo page
https://ryunosinfx.github.io/TweetImagesAsFileConverter/index.html

### file convert logic
 * to images
   * file -> dataUriScheme
   * fileName->fileName@base64
   * fileName@base64+','+dataUriScheme -> uint8array
   * uint8array is split max 4 image files -> 900*900 pixel(first pixcel is 0,0,0,0. use RGB,not use alpha channel. and padding ","=44)
   
 * to File
   * images -> dataUriScheme
   * dataUriScheme -> Bitmap data (900*900 pixel,first pixcel is 0,0,0,0. use RGB,not use alpha channel)
   * Bitmap data -> uint8array(filter only RGB pixels only)
   * uint8arrays join -> all uint8array
   * all uint8array -> string(filename & dataUri)
   * string split "," -> filename & dataUri
   * download dataUri as filename
