//object with questions array, answer, counter
var quiz = {
    //Same question for all
    questions: [{
        image: "gendry.jpg",
        text: "Who is this character?",
        Choices: ["Gendry", "Cersei Lannister", "Joffrey Baratheon", "Jon Snow"],
        Answer: 0
    }, {
        image: "jon-snow.jpg",
        text: "Who is this character?",
        Choices: ["Jon-Snow", "Ramsay Bolton", "Sandor-Clegane", "Samwell Tarly"],
        Answer: 0
    }, {
        image: "arya-stark.jpg",
        text: "Who is this character?",
        Choices: ["Cersei Lannister", "Sansa Stark", "Arya Stark", "Margaery Tyrell"],
        Answer: 2
    }, {
        image: "tyrion-lannister.jpg",
        text: "Who is this character?",
        Choices: ["Bran Stark", "Petyr Baelish", "Sandor Clegane", "Tyrion Lannister"],
        Answer: 3
    }, {
        image: "ygritte.jpg",
        text: "Who is this character?",
        Choices: ["Margaery Tyrell", "Ygritte", "Sansa Stark", "Brienne of Tarth"],
        Answer: 1
    }, {
        image: "khal-drogo.jpg",
        text: "Who is this character?",
        Choices: ["Samwell Tarly", "Khal Drogo", "Ramsay Bolton", "Petyr Baelish"],
        Answer: 1
    }, {
        image: "daenerys-targaryen.jpg",
        text: "Who is this character?",
        Choices: ["Daenerys Targaryen", "Ygritte", "Cersei Lannister", "Arya Stark"],
        Answer: 0
    }, {
        image: "jaime-lannister.jpg",
        text: "Who is this character?",
        Choices: ["Samwell Tarly", "Joffrey Baratheon", "Jaime Lannister", "Varys"],
        Answer: 2
    }, {
        image: "brienne-of-tarth.jpg",
        text: "Who is this character?",
        Choices: ["Margaery Tyrell", "Brienne of Tarth", "Cersei Lannister", "Sansa Stark"],
        Answer: 1
    }, {
        image: "sansa-stark.jpg",
        text: "Who is this character?",
        Choices: ["Margaery Tyrell", "Brienne of Tarth", "Cersei Lannister", "Sansa Stark"],
        Answer: 3
    }],

    //Multiple choices along with image jQuery and answer


    //question number
    questionNumber: 0,

    //question counter that adds 1 when next question button is selected
    questionCounter: function() {
        this.questionNumber += 1;
    },

    //score so far
    score: 0,

    //get the current question for display
    getQuestion: function() {
        return this.questions[this.questionNumber - 1]['text'];
    },

    //get the current multiple choices to display for current question
    getCurrentChoices: function() {
        return this.questions[this.questionNumber - 1]['Choices'];
    },

    //get the correct answer choice
    getCorrectAnswer: function() {
        return this.questions[this.questionNumber - 1]['Answer'];
    },

    getImage: function() {
        return this.questions[this.questionNumber - 1]['image'];
    }

};

var feedback = {
    correct: "Correct!",
    incorrect: "Wrong!"
}



function getScore() {
    if ($('#choices.display input[value=" + getCorrectAnswer + "]"').val() == quiz.getCorrectAnswer()) {
        quiz.score += 1;
        $('#feedback').text(feedback.correct);
    } else {
        $('#feedback').text(feedback.incorrect);
        $('#submit-answer').hide();
    }
}


//hide: everything except start quiz button
function hide1() {
    $('#restart-button').hide();
    $('#current-question').hide();
    $('#current-score').hide();
    $('#image-display').hide();
    $('#question-display').hide();
    $('#choices-display').hide();
    $('#submit-button').hide();
    $('#next-question-button').hide();
    $('#final-score-button').hide();
    $('#background-image').hide();
}


function runCounter() {
    quiz.questionCounter();
};

function displayQuestionChoice() {

    quiz.getCurrentChoices();
    $('#question-display').show().html("<p>" + quiz.getQuestion() + "</p> <br/>");
    $('#image-display').show().append("<img src='images/" + quiz.getImage() + "'>");
    $('#choices-display').show();
    var dom = $('#choices-display');
    dom.html(""); //cleared contents of the DOM before appending the choices
    quiz.getCurrentChoices().forEach(function(val) {
        dom.append("<input type='radio' name='choice' value=" + val + "><label for='a' id='_a'>" + val + "</label><br/>");
    })

};

function startButton() {
    $('#start-button').click(function(event) {
        event.preventDefault();
        //hide start button once clicked, #background-video disappear
        $(this).hide();
        //hide background video
        $('#background-video').css('display', 'none');
        //new background image appears
        $('#background-image').show();
        //run and add 1 to questionCounter
        runCounter();
        //displays question, image of character, and choices
        displayQuestionChoice();
        //show submit answer button
        $('#submit-button').show();
    });
};

function submitButton() {
    $('#submit-button').click(function(event) {
        event.preventDefault();

        //check for correct answer & feedback


        // if it is the last question:
        if (quiz.questionNumber == (Object.keys(quiz.questions).length - 1)) {

        //show final score button
        $('#final-score-button').show();
        //highlight correct answer
        $('#choices.display input[value=" + getCorrectAnswer + "]"').css('highlight', 'yellow');
        
        } else {
            //show next question button
            $('#next-question-button').show();
        }

        //hide submit button
        $(this).hide();
        //show questionNumber out of total questions
        $('#current-question').show().append("Question: " + quiz.questionNumber + " out of " + (Object.keys(quiz.questions).length));
        //show quiz.score out of total questions
        $('#current-score').show().append("Score: " + quiz.score + " out of " + (Object.keys(quiz.questions).length));


    })
};

// jQuery
$(document).ready(function() {
    $('#background-video').css('display', 'block');
    //hidden: question-display, choices-display, submit button, next question button

    //question counter, score counter
    hide1();

    //start button submit:
    startButton();

    //submit answer button submit:

});



/*next question button clicked
    -hide next question button
    -run and add 1 to questionCounter
    -show question & multiple choices
    -show submit answer button
*/

/*final score button clicked
    -show calculation of total score in percentage
    -show reset game button
*/

/*reset game button clicked
    -button should have new quiz to be created by object.create()


*/
