const express = require("express");
const router = express.Router();
const auth = require("../../server/middleware/auth");
const { check } = require("express-validator");

const tweetsController = require("../controllers/tweets");

/**
 * @route   POST api/tweets
 * @desc    Post a tweet
 * @access  Private
 */

router.post(
    "/",
    [auth, [check("text", "Text Is Required").not().isEmpty()]],
    tweetsController.postTweet
);

/**
 * @route   GET api/tweets
 * @desc    Get tweets of followed users
 * @access  Private
 */

router.get("/", auth, tweetsController.getTweets);

/**
 * @route   GET api/tweets/user/userId
 * @desc    Get a user's tweets
 * @access  Private
 */

router.get("/user/:userId", auth, tweetsController.userTweets);

/**
 * @route   GET api/tweets/:id
 * @desc    Get a tweet by it's id
 * @access  Private
 */

router.get("/:id", auth, tweetsController.getTweet);

/**
 * @route   DELETE api/tweets/:id
 * @desc    Delete a tweet
 * @access  Private
 */

router.delete("/:id", auth, tweetsController.deleteTweet);

/**
 * @route   PUT api/like/:id
 * @desc    Like a tweet
 * @access  Private
 */

router.put("/like/:id", auth, tweetsController.likeTweet);

/**
 * @route   POST api/tweet/reply
 * @desc    Reply on a tweet
 * @access  Private
 */

router.post(
    "/reply/:id",
    [auth, [check("text", "Text Is Required").not().isEmpty()]],
    tweetsController.postReply
);

/**
 * @route   DELETE api/tweets/reply/:tweetId/:replyId
 * @desc    Delete a reply
 * @access  Private
 */

router.delete("/reply/:tweetId/:replyId", auth, tweetsController.deleteReply);

module.exports = router;