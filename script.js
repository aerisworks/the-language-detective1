// حفظ اسم التلميذ
function startJourney() {
    let name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("من فضلك اكتبي اسمك أولًا");
        return;
    }

    localStorage.setItem("studentName", name);
    window.location.href = "guide.html";
}

// عرض اسم التلميذ في الصفحات
document.addEventListener("DOMContentLoaded", function () {
    let name = localStorage.getItem("studentName") || "المحقق الصغير";

    document.querySelectorAll(".student-name").forEach(function (element) {
        element.textContent = name;
    });
});

// اختيار الإجابة
function selectAnswer(button) {
    let question = button.closest(".question");

    question.querySelectorAll(".options button").forEach(function (item) {
        item.classList.remove("selected");
    });

    button.classList.add("selected");
    question.dataset.answer = button.dataset.answer;
}

// التحقق من الإجابة
function checkAnswer(button) {
    let question = button.closest(".question");
    let feedback = question.querySelector(".feedback");

    if (!question.dataset.answer) {
        feedback.textContent = "اختاري إجابة أولًا";
        feedback.className = "feedback wrong";
        return;
    }

    if (question.dataset.answer === question.dataset.correct) {
        feedback.textContent = "أحسنت! إجابة صحيحة ⭐";
        feedback.className = "feedback correct";
        question.dataset.solved = "yes";

        question.querySelectorAll("button").forEach(function (item) {
            item.disabled = true;
        });

        let next = document.getElementById("nextButton");
        if (next) next.disabled = false;

    } else {
        feedback.textContent = question.dataset.retry || "حاولي مرة أخرى، وفكري جيدًا.";
        feedback.className = "feedback wrong";
    }
}

// الاختبار القبلي
function finishPretest() {
    window.location.href = "noun.html";
}

// حساب نتيجة الاختبار البعدي
function finishPosttest() {
    let questions = document.querySelectorAll(".question");
    let score = 0;

    questions.forEach(function (question) {
        if (question.dataset.answer === question.dataset.correct) {
            score++;
        }
    });

    localStorage.setItem("finalScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    window.location.href = "result.html";
}

// عرض النتيجة
function showResult() {
    let score = Number(localStorage.getItem("finalScore") || 0);
    let total = Number(localStorage.getItem("totalQuestions") || 10);

    document.getElementById("score").textContent =
        score + " من " + total;

    let percentage = Math.round((score / total) * 100);

    if (percentage >= 75) {
        document.getElementById("message").textContent =
            "رائع! لقد أصبحت محققًا لغويًا ماهرًا ⭐";
    } else {
        document.getElementById("message").textContent =
            "أحسنت المحاولة! راجع الدروس وحاول مرة أخرى.";
    }
}