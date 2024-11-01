window.onload = function() {
//fetch('https://api.npoint.io/ea956d7a6dc6eb356e9a') //Here we try to retrieve/fetch the posts information from the endpoint (URI)  //task 4
fetch('json/describePost.json')  //getting data locally     //Task 5
  .then(response => response.json()) //tells JavaScript to parse the JSON data, converting it into a format we can work with in JavaScript (like objects and arrays).
  .then(data => {   //receives the parsed JSON data as data, which we can now use to dynamically create HTML content.
   
    console.log(data);  // Logs the JSON data for debugging

    const postsContainer = document.querySelector('main');  // Container for posts

    // Loop through each post and create elements
    data.posts.forEach(post => {
      // Create the main container for a single post
      const divToHoldSinglePost = document.createElement('fieldset');
      divToHoldSinglePost.className = 'post';

      // Create the header section
      const postHead = document.createElement('div');
      postHead.className = 'posthead';

      // Create the table for date and profile image
      const table = document.createElement('table');
      const row = document.createElement('tr');

      const profileImgCell = document.createElement('td');
      const profileImg = document.createElement('img');
      profileImg.src = post.profileImage;
      profileImg.alt = 'profile_picture';
      profileImg.width = 40;
      profileImg.height = 40;
      profileImgCell.appendChild(profileImg);

      const dateCell = document.createElement('td');
      const dateHeading = document.createElement('h1');
      dateHeading.innerText = post.date;
      dateCell.appendChild(dateHeading);

      row.appendChild(profileImgCell);
      row.appendChild(dateCell);
      table.appendChild(row);
      postHead.appendChild(table);

      // Append the header to the main post container
      divToHoldSinglePost.appendChild(postHead);

      // Check for post image and add if present        //Task 6
      if (post.postImage) {
        const postImageDiv = document.createElement('div');
        postImageDiv.className = 'postimg';
        const postImage = document.createElement('img');
        postImage.src = post.postImage;
        postImage.width = 500;
        postImage.height = 500;
        postImage.alt = 'Post image';
        postImageDiv.appendChild(postImage);
        divToHoldSinglePost.appendChild(postImageDiv);
      }
      

      // Create the caption/content area
      const postCap = document.createElement('div');
      postCap.className = 'postcap';

      // Add title if available
      if (post.title) {
        const titleElement = document.createElement('h3');
        titleElement.innerText = post.title;
        postCap.appendChild(titleElement);
      }

      // Add content
      const contentParagraph = document.createElement('p');
      contentParagraph.innerText = post.content;
      postCap.appendChild(contentParagraph);

      // Append caption/content to main post container
      divToHoldSinglePost.appendChild(postCap);

      // Add the like icon and count
      const likeIcon = document.createElement('div');
      likeIcon.className = 'likeIcon';
      likeIcon.innerText = `👍 ${post.likes}`;
      divToHoldSinglePost.appendChild(likeIcon);

      // Append the complete post container to the main element
      postsContainer.appendChild(divToHoldSinglePost);

      // Add a line break after each post to separate it from the next
      postsContainer.appendChild(document.createElement("br"));
    });
  })
  .catch(err => {
    // Create an error message element if fetch fails
    const errDiv = document.createElement("div");
    errDiv.className = 'post';
    errDiv.innerText = `Error: ${err}`;
    document.body.appendChild(errDiv);
  })
  .finally(() => {
    // Add footer with the current date and time
    const footer = document.createElement("footer");
    const date = new Date().toLocaleString();
    footer.innerText = `Last updated on: ${date}`;
    document.body.appendChild(footer);
  });
};




   //This was a lazy way to do that:
   /*
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
  });*/