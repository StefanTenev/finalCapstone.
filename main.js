//START OF IMAGE SLIDESHOW CODE BLOCK
//code blow below contains a function that rotates the images on the home page

//the whole slide flexbox is taken, will later be used to check if it exists on the page and only activate the 
//slideshow function if it does
const slide = document.querySelector(".slide-flexbox")
//each image is taken into a node array
const slidingImages = document.querySelectorAll(".slide-flexbox img")

//opacityChanger variable will be user to reduce the opacity of an image until it hides visually
let opacityChanger = 0.05;
//counter variable - will be used to keep track of the image number at rotation and reset the rotation once the last image is reacher
let counter = 0;
//imageSwap function - function that will begin image swap and call itself again - to keep an indefinite cycle
function imageSwap(){ 
    //all the images are together in a flexbox - setting the display to none and then unsetting the display
    //ONLY for the image that we need to currently rotate is what will allow for a single image on the screen
    slidingImages.forEach(element => element.style.display = "none")
     
        //when the function begins - the first image is displayed, with its opacity set to 1 (no transparency)
        slidingImages[counter].style.display = "unset"
        slidingImages[counter].style.opacity = 1
    
    //right after being unset - the first image's opacity is quickly decremented using a setInterval
    let indervalID = setInterval(()=>{
        slidingImages[counter].style.opacity -= opacityChanger
        //when the opacity reaches 0 - the display is set to none (allowing for the next image to begin showing) and the setInterval is cleaerd
        if(slidingImages[counter].style.opacity < 0){
            slidingImages[counter].style.opacity = 0
            slidingImages[counter].style.display = "none"
            //next image's opacity is prepared - set to 0 so that it doesn't instantly apper once its display is unset (and it shows again)
            
            slidingImages[counter+1].style.opacity = 0
            //next image is unset and now it is the main image showing on the screen (all others have display = none)
            slidingImages[counter+1].style.display = "unset"
            
            clearInterval(indervalID)
            }
    }, 25)
    
    setTimeout(()=>{
        //opacity of the main image is now incremented back (decrementing with a -ve opacity) to 1
        let indervalID = setInterval(()=>{
            console.log(counter, slidingImages[counter+1])
            slidingImages[counter+1].style.opacity -= -opacityChanger
        //when the opacity reaches 1 - the interval is cleared
            if(slidingImages[counter+1].style.opacity > 1){ 
                slidingImages[counter+1].style.opacity = 1
                clearInterval(indervalID)   
            }
        }, 25)
    }, 500)
    //this most outer set timeout is what determines how long will the image display on screen before swap - currently, 5000ms
    //firstly - the counter is incremented
    setTimeout(()=>{
        counter++
        //if the counter > 4 i.e. when it reaches 5 - it will decrement the last image, this step is used so that 
        //and extra piece of code - slidingImages[0].style.display = "unset" - can be added, right after removing the 
        //last image -without it - there will be no image at all on the screen (as the rest also have display = none)
        // and the html will collapse to take up the space created by the lack of an image element on display
        //setting the blank image to unset, will help to keep an image on display - but it will be a blank one
        if(counter > 4){
            
        setTimeout(()=>{
            let indervalID = setInterval(()=>{
            slidingImages[counter].style.opacity -= opacityChanger
            
            if(slidingImages[counter].style.opacity == 0){
                slidingImages[counter].style.display = "none"
                slidingImages[0].style.display = "unset"
                clearInterval(indervalID)
            }
        }, 25)
        //reset the counter to 0 (the 1st - blank image will be kept at display) and re-call the imageswap function 
            setTimeout(()=>{
                counter = 0
                imageSwap()
            }, 500)   
        },500)
        //if counter != 5 - just call image swap as per normal and continue the cycle
            }else{
                imageSwap()
            } 
    },5000)
}
//this will be the first call of image swap - only executed if the image slideshow flexbox actually exists on the page
if(slide != null){
    imageSwap()
}
//END OF IMAGE SLIDESHOW CODE BLOCK
let savedArticles = [];

//if initiations - keeping trakc if the page is loaded before - if not - set items in the local storage
//if it isn't the first item - don't set and avoid resetting of the items
if(localStorage.getItem("savedArticleNumber") == null){
    localStorage.setItem("savedArticleNumber", '0')
}
if(localStorage.getItem("savedArticles") == null){
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
}

//store all the save buttons in a node array
let saveButton = document.querySelectorAll(".saveButton")
//give each button an event listener - for keeping track of the number of saved items
saveButton.forEach(element =>{
    //on click, increment the saves and display the current saves
    element.addEventListener("click", event =>{
        let saveNumber = Number(JSON.parse(localStorage.getItem("savedArticleNumber")))
        saveNumber++
        localStorage.setItem("savedArticleNumber", saveNumber)
        alert(`You have ${JSON.parse(localStorage.getItem("savedArticleNumber"))} saved articles! :)`)
    })
})

//give each button an event listener - for adding an article to the saved articles section
saveButton.forEach(element =>{
    element.addEventListener("click", event => {
        //take the current saved articles from the local storage and update the savedArticles variable
        savedArticles = JSON.parse(localStorage.getItem("savedArticles"))
        //create an empty object literal - which will be used for keeping the article name and link
        //a class could be used here to create the object - but with only two properties, which are fairly direct,
        //creating the class would have made the code longer and more complex unnessecarily
        let article = {}
        //target the WHOLE table row, so that we can then target children of the table row (to get the name and the link)
        let tableRow = event.target.parentNode.parentNode
        //storing the article heading node
        let articleTitle = tableRow.querySelector(".articleTitle")
        //storing the article link node
        let articleLink = tableRow.querySelector(".articleLink")
        //setting a property in the empty article object - the article.title - to the text content of the articleTitle node above
        article.title = articleTitle.textContent
        //setting a property in in the article object - the article.link - to the href of the anchor within the articleLink nide above
        article.link = articleLink.querySelector("a").getAttribute("href")
        //push the article object, now with its 2 properties, into the saved articles array
        savedArticles.push(article)
        //set the savedArticles in the local storage - to the updated savedArticles array
        localStorage.setItem("savedArticles", JSON.stringify(savedArticles) )
    })  
})
//function used to load all the saved articles 
function loadSavedArticles(){
    //loop iterating through the savedArticles array in the storage and taking the 2 properties from the object at every index
    //use the 2 properties to create a saved article html element appearring on screen
    for(let i = 0; i < JSON.parse(localStorage.getItem("savedArticles")).length; i++){
        let savedArticlesContaienr = document.getElementById("savedArticlesGridContainer")
        let newSavedArticle = document.createElement("p")
    newSavedArticle.innerHTML = `${JSON.parse(localStorage.getItem("savedArticles"))[i].title}<br><hr><a target="_blank" href="${JSON.parse(localStorage.getItem("savedArticles"))[i].link}">Link</a>`
    savedArticlesContaienr.appendChild(newSavedArticle)
    }
}

//storing the button node for submitting a comment into a variable 
let commentButton = document.querySelector(".submitCommentButton")
//storing the value of the comment in the textbox into a variable
let comment = document.querySelector(".commentSection").querySelector("input").value
//creating an array for each comment section - the biology and chemistry section
let biologyCommentsArray = [];
let chemistryCommentsArray = [];

//just like before - check if the page is loaded for the first time and set an empty array (one for each comment section)
//in the storage - if it isn't the first time - don't set the array, so to avoid resetting
if(localStorage.getItem("biologyCommentsArray") == null || localStorage.getItem("chemistryCommentsArray") == null){
    localStorage.setItem("biologyCommentsArray", JSON.stringify(biologyCommentsArray));
    localStorage.setItem("chemistryCommentsArray", JSON.stringify(chemistryCommentsArray));
}

//a function to clear the texbox, used when a comment is submitted 
function clearComment(){
    document.querySelector(".commentSection").querySelector("input").value = ""
}

//the 2 functions below are used to check if there are any comments in the storage and keep them on display
//2 separate functions for the biology and chemistry sections - in order to keep each with their own comment seciton
function loadCommentsChemistry(){
    let commentsDiv = document.querySelector(".comments")
    for(let i = 0; i < JSON.parse(localStorage.getItem("chemistryCommentsArray")).length; i++){
        let newComment = document.createElement("p")
        newComment.innerHTML = `${JSON.parse(localStorage.getItem("chemistryCommentsArray"))[i]}`
        commentsDiv.appendChild(newComment)
    }
}
function loadCommentsBiology(){
    let commentsDiv = document.querySelector(".comments")
    for(let i = 0; i < JSON.parse(localStorage.getItem("biologyCommentsArray")).length; i++){
        let newComment = document.createElement("p")
        newComment.innerHTML = `${JSON.parse(localStorage.getItem("biologyCommentsArray"))[i]}`
        commentsDiv.appendChild(newComment)
    }
}

//event listener to the button that submits the comment
commentButton.addEventListener("click", event =>{
    //if the biology content exists - add event listener to the comments, using the biology comments array, else - use the chemistry's comment's array
    if(document.querySelector(".biology-content") != null){
        //creating a variable for the user comment input value
        let comment = document.querySelector(".commentSection").querySelector("input").value
        //taking the current comment array from the local storage (to which the comment will be unshifted)
        let commentsArray = JSON.parse(localStorage.getItem("biologyCommentsArray"))
        //creating a variable for the comments div - to which the new comment will be appended
        let commentsDiv = document.querySelector(".comments")
        //unshift the new comment into the comments aray - in order to keep most recent comments first
        commentsArray.unshift(comment)
        //update the local storage bio comments array
        localStorage.setItem("biologyCommentsArray", JSON.stringify(commentsArray))
        //create the new element - where the new comment will be held and give it a text of the user's comment value
        let newComment = document.createElement("p")
            newComment.innerHTML = `${comment}`
            //if the array is empty - simply append - otherwise, insert it before the first item - so that the newest comment is first (remember that items were unshifted, rather than pushed)
            if(commentsArray != []){
                commentsDiv.insertBefore(newComment, commentsDiv.children[0])
            }else{
                commentsDiv.appendChild(newComment)
            }
            //call the clear comment function from above to clear the input textbox
        clearComment()
    }else{
        //this section functions identically to the section above (it is a copy-paste in fact), but does it for and using the CHEMISTRY-COMMENTS-ARRAY INSTEAD
        //(thus only done when the bio contents aren't available on the html)
        let comment = document.querySelector(".commentSection").querySelector("input").value
        let commentsArray = JSON.parse(localStorage.getItem("chemistryCommentsArray"))
        let commentsDiv = document.querySelector(".comments")

        commentsArray.unshift(comment)

        localStorage.setItem("chemistryCommentsArray", JSON.stringify(commentsArray))
        
        let newComment = document.createElement("p")
            newComment.innerHTML = `${comment}`
            if(commentsArray != []){
                commentsDiv.insertBefore(newComment, commentsDiv.children[0])
            }else{
                commentsDiv.appendChild(newComment)
            }
        clearComment()
    }
    
})

//storing all like buttons in a node array
let likeButtonsArr = document.querySelectorAll(".likeButton")
//storing all likes (these are just the number of likes for each article) into a node array
let likes = document.querySelectorAll(".likes")

//creating an empty likes array this will hld objects with the number of likes for each article
let likesArray = [];
//just like before...if the page loads for first time - initiate the likes in the storage to the empty likes array 
//(else use the existing - otherwise, the likes in the storage will be reset...)
if(localStorage.getItem("likes") == null){
    localStorage.setItem("likes", JSON.stringify(likesArray))
    //on top of setting the likes array in local storage...
    likeButtonsArr.forEach(element =>{
        //for each button, create an object, containing the article name and the number of likes and
        //push it into the likes array, taken from the storage and then update the storage with the just updated likes array
        let likesArray = JSON.parse(localStorage.getItem("likes"))
        let tableRow = element.parentNode.parentNode
        let articleName = tableRow.querySelector(".articleTitle").textContent
        let likes = Number(tableRow.querySelector(".likes").textContent)
        //just like before - create an object, this time, with properties of the article title and its likes (instead of link)
        //the likes are the likes taken from the storage
        let articleObject = {
            articleTitle : articleName,
            articleLikeCount : likes
        }
        //push the object into the likes array and then use the new likes array to update the likesArray in the storage
        likesArray.push(articleObject)
        localStorage.setItem("likes", JSON.stringify(likesArray))
    })
}
//for each of the likes button - add an event listener (this will give likes to the articles)
likeButtonsArr.forEach(element =>{

    element.addEventListener("click", event =>{
        //take the likes array from storage and store it into a likes array
        let likesArray = JSON.parse(localStorage.getItem("likes"))
        //target the WHOLE table row - so that we can take the title of the article which will be liked and track only its likes number
        let tableRow = event.target.parentNode.parentNode
        //using the tableRow, target the article title to get the article heading of the article which we liked
        let articleName = tableRow.querySelector(".articleTitle").textContent

        //a loop going through the likesArray and checking if the articleTitle and the liked article's title match
        //if they do - take the number of likes for that article and increment it, then update the text content 
        //of the .likes node to the incremented value
        for(let i = 0; i < likesArray.length; i++){
            if(likesArray[i].articleTitle == articleName){
                likesArray[i].articleLikeCount = Number(likesArray[i].articleLikeCount) + 1
                tableRow.querySelector(".likes").textContent = `${likesArray[i].articleLikeCount}`
                break;
            }
        }
        //update the likes in the local storage
        localStorage.setItem("likes", JSON.stringify(likesArray))
    })
})
//latly, a function that loads the likes for each article - it uses the likes array, which will contain an object
//if the article with its title and its likes - which will update the html accordingly on load
function loadLikes(){
    let likesArray = JSON.parse(localStorage.getItem("likes"))
    let likes = document.querySelectorAll(".likes")
    for(let i = 0; i < JSON.parse(localStorage.getItem("likes")).length; i++){
        let likeCount = Number(likesArray[i].articleLikeCount)
        likes[i].textContent = `${likeCount}`
    }
}

//I WAS NOT SURE WHAT LIKES SYSTEM SHOULD THE BUTTONS FOLLOW - as it is only a local/session storage system anyway, i.e. an external
//server is not present - on one hand, it makes sense that the user can only like once, on the other hand noone else 
//will be able to like anyway so the farthest implication of this system will be that all articles could potentially have 1 like,
//which seemed a bit dull/incomplete
//- so for now I made it so that the user can like as many times as possible, (possibly for a 
//a case where multiple users use same PCs and same local storage...?)