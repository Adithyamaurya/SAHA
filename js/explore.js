document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabs.length && tabContents.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active");
        const tabId = tab.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
      });
    });
  }

  // Load trending ideas
  const trendingTab = document.getElementById("trending");
  if (trendingTab) {
    // This would normally be an API call, but for this example we'll use mock data
    const trendingIdeas = [
      {
        id: 1,
        title: "AI-powered local language learning app",
        author: {
          name: "Priya Sharma",
          avatar: "https://via.placeholder.com/40",
        },
        description:
          "An app that uses AI to teach programming in regional Indian languages, making coding accessible to more people.",
        tags: ["AI", "Education", "Mobile"],
        upvotes: 42,
        comments: 12,
        date: "Oct 15, 2023",
      },
      {
        id: 3,
        title: "Developer-focused job board",
        author: {
          name: "Ankit Patel",
          avatar: "https://via.placeholder.com/40",
        },
        description:
          "A job board specifically for Indian developers with transparent salary information and remote-friendly options.",
        tags: ["Jobs", "Remote Work"],
        upvotes: 56,
        comments: 15,
        date: "Oct 10, 2023",
      },
    ];

    renderIdeas(trendingIdeas, trendingTab);
  }

  // Load recent ideas
  const recentTab = document.getElementById("recent");
  if (recentTab) {
    // This would normally be an API call, but for this example we'll use mock data
    const recentIdeas = [
      {
        id: 1,
        title: "AI-powered local language learning app",
        author: {
          name: "Priya Sharma",
          avatar: "https://via.placeholder.com/40",
        },
        description:
          "An app that uses AI to teach programming in regional Indian languages, making coding accessible to more people.",
        tags: ["AI", "Education", "Mobile"],
        upvotes: 42,
        comments: 12,
        date: "Oct 15, 2023",
      },
      {
        id: 2,
        title: "Marketplace for rural artisans",
        author: {
          name: "Rahul Verma",
          avatar: "https://via.placeholder.com/40",
        },
        description:
          "A platform connecting rural artisans directly with global customers, eliminating middlemen and increasing profits.",
        tags: ["Marketplace", "Social Impact"],
        upvotes: 38,
        comments: 8,
        date: "Oct 12, 2023",
      },
      {
        id: 3,
        title: "Developer-focused job board",
        author: {
          name: "Ankit Patel",
          avatar: "https://via.placeholder.com/40",
        },
        description:
          "A job board specifically for Indian developers with transparent salary information and remote-friendly options.",
        tags: ["Jobs", "Remote Work"],
        upvotes: 56,
        comments: 15,
        date: "Oct 10, 2023",
      },
    ];

    renderIdeas(recentIdeas, recentTab);
  }

  // Function to render ideas
  function renderIdeas(ideas, container) {
    const ideaList = document.createElement("div");
    ideaList.className = "idea-list";

    ideas.forEach((idea) => {
      const ideaCard = document.createElement("div");
      ideaCard.className = "idea-card";

      // Create idea header
      const ideaHeader = document.createElement("div");
      ideaHeader.className = "idea-header";

      const authorDiv = document.createElement("div");
      authorDiv.className = "idea-author";

      const avatar = document.createElement("img");
      avatar.src = idea.author.avatar;
      avatar.alt = idea.author.name;
      avatar.className = "author-avatar";

      const authorInfo = document.createElement("div");
      const authorName = document.createElement("h4");
      authorName.textContent = idea.author.name;

      const ideaDate = document.createElement("span");
      ideaDate.className = "idea-date";
      ideaDate.textContent = idea.date;

      authorInfo.appendChild(authorName);
      authorInfo.appendChild(ideaDate);

      authorDiv.appendChild(avatar);
      authorDiv.appendChild(authorInfo);

      const bookmarkBtn = document.createElement("button");
      bookmarkBtn.className = "btn-icon";
      bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';

      ideaHeader.appendChild(authorDiv);
      ideaHeader.appendChild(bookmarkBtn);

      // Create idea body
      const ideaBody = document.createElement("div");
      ideaBody.className = "idea-body";

      const titleLink = document.createElement("a");
      titleLink.href = `idea-detail.html?id=${idea.id}`;

      const title = document.createElement("h3");
      title.textContent = idea.title;

      titleLink.appendChild(title);

      const description = document.createElement("p");
      description.textContent = idea.description;

      const tags = document.createElement("div");
      tags.className = "tags";

      idea.tags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag";
        tagSpan.innerHTML = `<i class="fas fa-tag"></i> ${tag}`;
        tags.appendChild(tagSpan);
      });

      ideaBody.appendChild(titleLink);
      ideaBody.appendChild(description);
      ideaBody.appendChild(tags);

      // Create idea footer
      const ideaFooter = document.createElement("div");
      ideaFooter.className = "idea-footer";

      const ideaActions = document.createElement("div");
      ideaActions.className = "idea-actions";

      const upvoteBtn = document.createElement("button");
      upvoteBtn.className = "btn-action";
      upvoteBtn.innerHTML = `<i class="fas fa-thumbs-up"></i><span>${idea.upvotes}</span>`;

      const commentBtn = document.createElement("button");
      commentBtn.className = "btn-action";
      commentBtn.innerHTML = `<i class="fas fa-comment"></i><span>${idea.comments}</span>`;

      ideaActions.appendChild(upvoteBtn);
      ideaActions.appendChild(commentBtn);

      const shareBtn = document.createElement("button");
      shareBtn.className = "btn-action";
      shareBtn.innerHTML = '<i class="fas fa-share"></i>';

      ideaFooter.appendChild(ideaActions);
      ideaFooter.appendChild(shareBtn);

      // Assemble the card
      ideaCard.appendChild(ideaHeader);
      ideaCard.appendChild(ideaBody);
      ideaCard.appendChild(ideaFooter);

      ideaList.appendChild(ideaCard);
    });

    // Add load more button
    const loadMoreDiv = document.createElement("div");
    loadMoreDiv.className = "load-more";

    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.className = "btn btn-outline";
    loadMoreBtn.textContent = "Load More";

    loadMoreDiv.appendChild(loadMoreBtn);

    // Clear container and append new content
    container.innerHTML = "";
    container.appendChild(ideaList);
    container.appendChild(loadMoreDiv);
  }
});
