$(document).ready(function () {
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "http://moviethemes.net/music/LOTR/Lord_Of_The_Rings__Main_Title_Theme.mp3");
    audioElement.loop = true;
    audioElement.play();

    questions = {
        "0": {
            soal: "Which Movie is not directed by Christopher Nolan?",
            opts: ["Inception", "Departed", "Memento", "Batman Begins"],
            javab: "Departed",
            key: "0",
            gRight: "assets/images/one.right.gif",
            gWrong: "assets/images/one.wrong.gif",
            music:"assets/music/departed.mp3",


        },
        "1": {
            soal: "Which one is the Best movie ever?",
            opts: ["Inception", "Lord of The Rings", "Gladiator", "Interstellar"],
            javab: "Lord of The Rings",
            gRight: "assets/images/two.right.gif",
            gWrong: "assets/images/two.wrong.gif",
            key: "1",
            music:"assets/music/lord.mp3",
        },
        "2": {
            soal: "Which Movie had the character Nikola Tesla?",
            opts: ["Interstellar", "Memento", "The Dark Knight", "Prestige"],
            javab: "Prestige",
            gRight: "assets/images/three.right.gif",
            gWrong: "assets/images/three.wrong.gif",
            key: "2",
            music:"assets/music/Wizard.mp3",
        },
        "3": {
            soal: "What is my Fav Tv Show :)?",
            opts: ["Peacky Blinders", "Game of Thrones", "Lost", "Suits"],
            javab: "Peacky Blinders",
            gRight: "assets/images/four.right.gif",
            gWrong: "assets/images/four.wrong.gif",
            key: "3",
            music:"assets/music/peaky.mp3",
        }
    }
    console.log(questions);
    quesCount = 3;
    cAnswers = 0;
    iAnswers = 0;
    unAnswers = 0;
    var remTime = 25;
    var cur = "";
    var setRemTime = function () {
        remTime = 26;
        uniqueInterval = setInterval(startTimer, 1000);

    };
//var timeStart = setInterval(startTimer,1000);
//var timeStop = clearInterval(timeStart);
//document.getElementById('timer').innerHTML = 25 ;
    var finalMessage = function () {
        clean();
        $(".mainSection").append($("<div class='final'>").text("Fun's Over. Here is how you did:")).append($("<div>").text("Correct Answers: " + cAnswers)).append($("<div>").text("Wrong Answers: " + iAnswers)).append($("<div>").text("Unanswered: " + unAnswers)).append($("<button id=\"restart\">Fancy Playing Again?</button>"));
    };
    var rightPick = function (gif) {
        $(".mainSection").append($("<div>").text("AMAZIIING!!!")).append(gif);
    };

    var wrongPick = function (ans, gif) {
        $(".mainSection").append($("<div>").text("You Looooose HAHAHAHA!!!")).append($("<div>").text("Correct Answer is: " + ans)).append(gif);
    };
    var noPick = function (ans, gif) {
        $(".mainSection").append($("<div>").text("Sorry, Too Slow!!!")).append($("<div>").text("Correct Answer is: " + ans)).append(gif);
    };


    var startTimer = function () {

        if (remTime === 0) {
            console.log(cur);
            clean();
            unAnswers++;
            remTime = 26;

            quesCount++;
            console.log(quesCount);

            var gif = $("<img class='img-responsive img-thumbnail img-circle wrong-image' alt='image'>").attr("src", questions[cur].gWrong);
            $(".mainSection").append(gif);
            noPick(questions[cur].javab, gif)
            //clearInterval(timeStart);
            if (quesCount < 4) {
                audio("assets/music/time.mp3");
                clearInterval(uniqueInterval);
                setTimeout(clean, 4000);
                setTimeout(setRemTime, 4000);
                setTimeout(whichQuestion, 4000);


            }
            else {
                audio("assets/music/over.mp3");
                clearInterval(uniqueInterval);
                setTimeout(finalMessage, 4000);
            }

        }
        else {
            --remTime;
            document.getElementById('timer').innerHTML = "Time Remaining: " + remTime + "s";
        }
    };

    var clean = function () {
        $(".mainSection").empty();
    }

    var showQuestion = function (question, showlocation) {
        var quesDiv = $("<div class='question' value='" + question.soal + "'>").text(question.soal);
        var optsDiv = $("<div class='opt'>");
        cur = question.key;
        console.log(cur);
        for (var i = 0; i < question.opts.length; i++) {
            var option = $("<div class='opts' value='" + question.opts[i] + "'  id='" + question.javab + "' number='" + question.key + "' >").text(question.opts[i]);
            optsDiv.append(option);

        }
        quesDiv.append(optsDiv);
        $(showlocation).append($("<div><span id=\"timer\"></span></div>")).append(quesDiv);

    };

    var audio = function (musictoplay) {
        audioElement.setAttribute("src", musictoplay );
        audioElement.play();
    }

    var whichQuestion = function () {
        showQuestion(questions[quesCount], ".mainSection");
        audio(questions[quesCount].music);
    };

    var xxx = "";
    $("#start").on("click", function () {
        document.getElementById('timer').innerHTML = "Time Remaining: " + 25 + "s";
        quesCount = 0;
        //setInterval(startTimer,1000);
        //uniqueInterval = setInterval(startTimer,1000); // hoisting
        setRemTime();
        whichQuestion();
        $("#start").remove();
    });

    /*$("#restart").on("click",function () {
        document.getElementById('timer').innerHTML ="Time Remaining: " + 25 +"s";
        quesCount= 0;
        clean();
        //uniqueInterval = setInterval(startTimer,1000);
        whichQuestion();
    });*/
    $(".mainSection").on("click", "#restart", function () {
        document.getElementById('timer').innerHTML = "Time Remaining: " + 25 + "s";
        quesCount = 0;
        clean();
        setRemTime();
        whichQuestion();
    });


    $(".mainSection").on("click", ".opts", function () {
        var pick = $(this).attr("value");
        var ans = $(this).attr("id");
        var gifPick = $(this).attr("number");
        console.log(gifPick);
        quesCount++;
        console.log(cur);

        if (pick === ans) {
            console.log(pick);
            clearInterval(xxx);
            cAnswers++;
            clean();
            console.log(questions[gifPick].gRight);
            var gif = $("<img class='img-responsive img-thumbnail img-circle right-image' alt='image'>").attr("src", questions[gifPick].gRight);
            rightPick(gif);
            if (quesCount < 4) {
                audio("assets/music/good.mp3");
                clearInterval(uniqueInterval);
                setTimeout(clean, 3000);
                setTimeout(setRemTime, 2900);
                setTimeout(whichQuestion, 3000);


            }
            else {
                audio("assets/music/over.mp3");
                clearInterval(uniqueInterval);
                setTimeout(finalMessage, 4000);
            }
        }
        else {
            clean();
            iAnswers++
            var gif = $("<img class='img-responsive img-thumbnail img-circle wrong-image' alt='image'>").attr("src", questions[gifPick].gWrong);
            wrongPick(ans, gif);
            if (quesCount < 4) {
                audio("assets/music/laugh.mp3");
                clearInterval(uniqueInterval);
                setTimeout(clean, 3000);
                setTimeout(setRemTime, 2900);
                setTimeout(whichQuestion, 3000);


            }
            else {
                audio("assets/music/over.mp3");
                clearInterval(uniqueInterval);
                setTimeout(finalMessage, 4000);
            }
        }


    })
})