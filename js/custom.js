(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
    	
	/* ..............................................
    Navbar Bar
    ................................................. */
	
	$('.navbar-nav .nav-link').on('click', function() {
		var toggle = $('.navbar-toggler').is(':visible');
		if (toggle) {
			$('.navbar-collapse').collapse('hide');
		}
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});

	/* ..............................................
    Properties Filter
    ................................................. */
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.properties-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.properties-list').isotope({
			itemSelector: '.properties-grid'
		});

	});

	/* ..............................................
    Gallery
    ................................................. */
	
	$(document).ready(function() {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
	});
	
	/* ..............................................
    Scroll To Top
    ................................................. */
	
	$(document).ready(function () {

		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#scroll-to-top').fadeIn();
			} else {
				$('#scroll-to-top').fadeOut();
			}
		});

		$('#scroll-to-top').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});

	});
	
	

	
}(jQuery));



/*chatbot js*/

/* ----------------------------
   OPEN/CLOSE CHATBOT
------------------------------ */
document.getElementById("chatbot-icon").onclick = () => {
    let win = document.getElementById("chatbot-window");
    let cloud = document.getElementById("welcome-cloud");

    if (win.style.display === "flex") {
        win.style.display = "none";   // close chat
        cloud.style.display = "block"; // show cloud again
    } else {
        win.style.display = "flex";    // open chat
        cloud.style.display = "none";  // hide cloud
    }
};

/* ----------------------------
   ADD MESSAGE
------------------------------ */
function addMessage(text, type) {
    let body = document.getElementById("chatBody");
    let msg = document.createElement("div");
    msg.className = "message " + type;
    msg.innerHTML = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}
 
/* ----------------------------
   COURSE DATA
------------------------------ */
const courseDetails = {
    ai: {
        syllabus: "AI Syllabus: ML, Deep Learning, Neural Networks.",
        fees: "AI Course Fees: ₹30000."
    },
    cloud: {
        syllabus: "Cloud Syllabus: AWS, Azure, DevOps basics.",
        fees: "Cloud Course Fees: ₹30000."
    },
    web: {
        syllabus: "Web Development Syllabus: HTML, CSS, JavaScript, React.",
        fees: "Web Development Fees: ₹25000."
    },
    java: {
        syllabus: "Java Syllabus: Core Java, OOP, JDBC, Spring Boot.",
        fees: "Java Course Fees: ₹22000."
    }
};
 
/* ----------------------------
   MAIN RADIO OPTIONS
------------------------------ */
function showMainOptions() {
    let box = document.createElement("div");
    box.className = "option-box";
    box.innerHTML = `
        <label><input type="radio" name="opt" value="courses"> Courses</label><br>
       
        <label><input type="radio" name="opt" value="timings"> Timings</label><br>
        <label><input type="radio" name="opt" value="placement"> Placement</label><br>
        <label><input type="radio" name="opt" value="address"> Address</label><br>
		 <label><input type="radio" name="opt" value="exit"> ❌ Exit Chat</label><br>
    `;
 
    box.querySelectorAll("input").forEach(r => {
        r.onclick = function () {
            handleUserMessage(r.value);
        };
    });
 
    document.getElementById("chatBody").appendChild(box);
}
 
/* ----------------------------
   SHOW COURSE OPTIONS
------------------------------ */
function showCourseOptions() {
    let box = document.createElement("div");
    box.className = "option-box";
 
    box.innerHTML = `
        <label><input type="radio" name="course" value="ai"> Artificial Intelligence</label><br>
        <label><input type="radio" name="course" value="cloud"> Cloud computing</label><br>
        <label><input type="radio" name="course" value="web"> Web Development</label><br>
        <label><input type="radio" name="course" value="java"> Java</label><br>
    `;
 
    box.querySelectorAll("input").forEach(r => {
        r.onclick = function () {
            showCourseDetails(r.value);
        };
    });
 
    document.getElementById("chatBody").appendChild(box);
}
 
/* ----------------------------
   SHOW COURSE DETAILS
------------------------------ */
function showCourseDetails(course) {
    let data = courseDetails[course];
 
    addMessage(
        `<b>${course.toUpperCase()} Course Details:</b><br>${data.syllabus}<br>${data.fees}`,
        "bot"
    );
 
    setTimeout(() => showMainOptions(), 500);
}
 
/* ----------------------------
   MAIN MESSAGE HANDLER
------------------------------ */
function handleUserMessage(msg) {
    msg = msg.toLowerCase();
    addMessage(msg, "user");
 
    if (msg === "courses") {
        addMessage("Choose a course below:", "bot");
        showCourseOptions();
        return;
    }
 
    if (msg === "fees") {
        addMessage("Fees vary by course. Select a course.", "bot");
        showCourseOptions();
        return;
    }
 
    if (msg === "timings") {
        addMessage("Classes: Mon–Sat, 10 AM to 6 PM.", "bot");
        showMainOptions();
        return;
    }
 
    if (msg === "placement") {
        addMessage("We provide 100% placement assistance.", "bot");
        showMainOptions();
        return;
    }
 
    if (msg === "address") {
        addMessage("1st Floor, Above Manyavar, Jayanagar, Shivamogga.", "bot");
        showMainOptions();
        return;
    }
 if (msg === "exit") {
    addMessage("Thank you! Chat closed.", "bot");
    setTimeout(() => {
        document.getElementById("chatbot-window").style.display = "none";
    }, 800);
    return;
}

    addMessage("How can I help you? Choose an option below.", "bot");
    showMainOptions();
}
 
/* ----------------------------
   SEND MESSAGE BUTTON
------------------------------ */
document.getElementById("sendBtn").onclick = sendText;
document.getElementById("userInput").addEventListener("keypress", e => {
    if (e.key === "Enter") sendText();
});
 
function sendText() {
    let text = document.getElementById("userInput").value.trim();
    if (text === "") return;
    document.getElementById("userInput").value = "";
    handleUserMessage(text);
}