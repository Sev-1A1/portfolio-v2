function showSidebar() {
  const sidebar = document.querySelector(".side-bar");
  sidebar.classList.add("is-open");
}

function hideSidebar(event) {
  event.stopPropagation();
  const sidebar = document.querySelector(".side-bar");
  sidebar.classList.remove("is-open");
}



const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

      
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const navigationLinks = document.querySelectorAll(
  ".nav-links a, .side-bar a",
);
const sections = document.querySelectorAll("main section[id]");

function setActiveNavigation(sectionId) {
  navigationLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}



navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href")?.slice(1);

    if (sectionId) {
      setActiveNavigation(sectionId);
    }
  });
});

const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNavigation(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-90px 0px -50% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => {
  navigationObserver.observe(section);
});