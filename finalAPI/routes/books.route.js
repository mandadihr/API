var express = require("express");
var router = express.Router();
var request = require("request");
var book = require("../models/bookInfo.model");
var library = require("../models/booklibrary.model");
var counters = require("../models/counters.model");

const googleapi = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
router.get("/getBookInfo", function (req, res) {
    var isbn = req.query.isbn;
    book.find({
        Isbn: isbn
    }, (err, response) => {
        if (err) {
            console.log("Error thrown in finding book in existing book collection " + err);
        } else if (response.length == 0) {
            console.log("No book found in bookcollection so calling google API");
            request(googleapi + isbn, {
                json: true
            }, async (err, response) => {
                if (err) {
                    return console.log(err);
                } else {
                    // res.send(response.body);
                    if(response.body.items.length > 0){
                        let bookBlobObj = (response.body.items[0]);
                    let bookBlobArray = JSON.stringify(response.body.items[0]);
                    // console.log("Blob " + bookBlobArray);
                    var bookObj = {
                        Isbn: bookBlobObj.volumeInfo.industryIdentifiers[0].identifier,
                        Description: bookBlobObj.volumeInfo.description,
                        Title: bookBlobObj.volumeInfo.title,
                        BookBlob: bookBlobArray,
                        Author: bookBlobObj.volumeInfo.authors[0],
                        ThumbNail: bookBlobObj.volumeInfo.imageLinks.thumbnail,
                        SubTitle: bookBlobObj.volumeInfo.subtitle,
                        CreatedBy: "Harish",
                        UpdatedBy: "Harish"
                    }
                    var x = await getNextSequenceValue("bookid");
                    // console.log("x value " + x);
                    let result = await book.create({
                        BookId: x,
                        Isbn: bookObj.Isbn,
                        Description: bookObj.Description,
                        Title: bookObj.Title,
                        ThumbNail: bookObj.ThumbNail,
                        SubTitle: bookObj.SubTitle,
                        BookBlob: bookObj.BookBlob,
                        Author: bookObj.Author,
                        CreatedBy: bookObj.CreatedBy,
                        UpdatedBy: bookObj.UpdatedBy
                    })
                    // console.log("Result " + result);
                    if (result == 0) {
                        console.log("not inserted")
                    } else {
                        console.log("book Saved successfully");
                    }
                    // console.log(result);
                    let result1 = []; //= result1.push(result);
                     result1.push(result);
                    // console.log("after converting to array" +result1);
                    res.send({
                        Status: 200,
                        Info: "Fetched book from google API and saved to books collection",
                        Books: result1});
                    }
                    else {
                        res.send({
                            Status: 200,
                            Info: "No Book Found",
                            Books: []
                        })
                    }
                }
            });
        } else {
            library.find({
                Isbn: isbn
            }, (err, response) => {
                if (err) {
                    console.log("error found fetching book from library" + err);
                } else if (response.length == 0) {
                    book.find({Isbn: isbn}, (err, response) => {
                        if (err) {
                            console.log("error found fetching book from books collection" + err);
                        }
                        else{
                            res.send({
                                Status: 200,
                                Info: "record from books",
                                Books: response
                            })
                        } 
                    })
                }
                else{
                    let owners = [];
                    response.forEach(function(element){
                        owners.push(element.LibraryName);
                    })
                    // console.log(owners)
                    res.send({
                        Status: 200,
                        Info: "record from Library",
                        Books: response,
                        Owners: owners 
                    })
                }
            })
        }
    })
});

router.post("/addToLibrary", async (req, res) => {
    var bookObject = req.body;
    let result = await library.create({
        BookId: bookObject.BookId,
        Isbn: bookObject.Isbn,
        Description: bookObject.Description,
        ThumbNail: bookObject.ThumbNail,
        SubTitle: bookObject.SubTitle,
        Title: bookObject.Title,
        BookBlob: bookObject.BookBlob,
        Author: bookObject.Author,
        LibraryName: bookObject.LibraryName,
        UserId: bookObject.UserId
    })
    res.send({
        Status: 200,
        Info: "Book successfully added"
    });
})


router.get("/getBooksFromLibrary", async (req, res) => {
    var userid = req.query.userid;
    let result = await library.find({UserId: userid}, (err, response) => {
        if(err){
            console.log("error fetching books from library")
        }
        else{
            res.send({
            Status: 200,
            Books: response
            })
        }
    })
})

async function getNextSequenceValue(sequenceName) {
    console.log("seq name " + sequenceName);

    var counterObj = await counters.findOneAndUpdate({
        "_id": sequenceName
    }, {
        "$inc": {
            "sequence_value": 1
        }
    }, {
        "new": true
    });
    // console.log("return value: " + JSON.stringify(counterObj.sequence_value));
    var incrementedValue = JSON.stringify(counterObj.sequence_value);
    console.log("Inc " + incrementedValue)
    return incrementedValue;
}

module.exports = router;