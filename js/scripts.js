//fetch('json/describePost.json')  //getting data locally
fetch('https://api.npoint.io/c66f28ce5e4b9b3baf54') //Here we try to retrieve/fetch the posts information from the endpoint (URI)  //task 4
  .then(response => response.json()) //tells JavaScript to parse the JSON data, converting it into a format we can work with in JavaScript (like objects and arrays).
  .then(data => {   //receives the parsed JSON data as data, which we can now use to dynamically create HTML content.
    const postsContainer = document.querySelector('main'); //This element serves as the container for all post elements we’ll add.
    data.posts.forEach(post => { //is a loop that goes through each post in the array.
      //representing the HTML structure for a post:
      // '?' - "if available"
        const postHTML = `
        <br>
        <fieldset class="post">
          <div class="posthead">
            <table>
              <tr>
                <td><img src="${post.profileImage}" alt="profile_picture" width="40" height="40"></td>
                <td><h1>${post.date}</h1></td>
              </tr>
            </table>
          </div>
          ${post.postImage ? `<div class="postimg"><img src="${post.postImage}" width="500" height="500" alt="Post image"></div>` : ""}
          <div class="postcap">
            ${post.title ? `<h3>${post.title}</h3>` : ""}
            <p>${post.content}</p>
          </div>
          <div class="likeIcon">👍 ${post.likes}</div>
        </fieldset>
        <br>
      `;
      postsContainer.innerHTML += postHTML; //takes the postHTML we just created and adds it to the main element in the HTML. ("+=" is for avoiding overwriting previous posts.)
    });
  });