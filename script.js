let currentProject = null;
let currentImageIndex = 0;
let currentColumns = 0;
let loadedProjects = [];
let filteredProjects = [];
let scrollX = 0;
let scrollY = 0;

let projectsByColumns = [];

// Function to fetch project data from JSON file
async function fetchProjects() {
  const response = await fetch('projects.json');
  const projects = await response.json();
  return projects; // Return the array of projects

}

// Function to create project cards
async function createProjectCards() {
  if (loadedProjects.length < 1 || loadedProjects == undefined)
  {
    loadedProjects = await fetchProjects();
    filteredProjects = loadedProjects;
  }

  const projects = filteredProjects;

  const grid = document.getElementById('tailwind-grid');
  grid.innerHTML="";
  currentColumns = getColumnsForCurrentBreakpoint();

  const projectsReordered = reorderColumnMajorToRowMajor(projects, currentColumns);
  // projectsReordered = projects;
  console.log('columns: ' + currentColumns);

  for (col = 0; col < projectsByColumns.length; col++)
  {
    const gridCol = document.createElement('div');
    for (row = 0; row < projectsByColumns[col].length; row++)
      {
        const project = projectsByColumns[col][row];
        if (project !=null)
        {
          const card = document.createElement('div');
        card.setAttribute('data-category', project.category);
        card.onclick = () => openProjectDetails(project);
        const img = document.createElement('img');
        img.src = project.thumbnail;
        img.alt = project.title;
        card.classList.add('tw-grid-item');
        card.classList.add('break-inside-avoid-column');
        card.classList.add('mb-16');//mb-6 aspect-video w-full
        card.classList.add('aspect-auto');
        card.classList.add('w-full');
        card.classList.add('opacity-0');
        card.classList.add('animate-fadeIn');
    
        const imgWrapper = document.createElement('div');
        imgWrapper.className = "relative group overflow-hidden";
    
        const title = document.createElement('div');
        title.className = 'project-title';
        // title.innerText = index;
        // title.innerText = project.title == undefined? "" : project.title;
    
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all duration-300';
        overlay.innerText = project.title == undefined? "Untitled" : project.title;
    
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(overlay);
    
        card.appendChild(imgWrapper);
        card.appendChild(title);
        // card.appendChild(category);
        gridCol.appendChild(card);
      }
      grid.appendChild(gridCol);
    }
        
  }

  // projectsReordered.forEach((project, index) => {
  //   const card = document.createElement('div');
  //   card.setAttribute('data-category', project.category);
  //   card.onclick = () => openProjectDetails(project);
  //   const img = document.createElement('img');
  //   img.src = project.thumbnail;
  //   img.alt = project.title;
  //   card.classList.add('tw-grid-item');
  //   card.classList.add('break-inside-avoid-column');
  //   card.classList.add('mb-16');//mb-6 aspect-video w-full
  //   card.classList.add('aspect-auto');
  //   card.classList.add('w-full');
  //   card.classList.add('opacity-0');
  //   card.classList.add('animate-fadeIn');

  //   const imgWrapper = document.createElement('div');
  //   imgWrapper.className = "relative group overflow-hidden";

  //   const title = document.createElement('div');
  //   title.className = 'project-title';
  //   // title.innerText = index;
  //   // title.innerText = project.title == undefined? "" : project.title;

  //   const overlay = document.createElement('div');
  //   overlay.className = 'absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all duration-300';
  //   overlay.innerText = project.title == undefined? "" : project.title;

  //   imgWrapper.appendChild(img);
  //   imgWrapper.appendChild(overlay);

  //   card.appendChild(imgWrapper);
  //   card.appendChild(title);
  //   // card.appendChild(category);
  //   grid.appendChild(card);
  // });
}

function reorderColumnMajorToRowMajor(array, columns) {
  const rows = Math.ceil(array.length / columns);
  console.log("rows: " + rows);
  const newArray = [];
  
  for (let col = 0; col < columns; col++)
  {
    projectsByColumns[col] = [];
    console.log("col:" + col);
    for (let row = 0; row < rows; row++)
    {
      console.log("row:" + row);
      //const index = col * rows + row;
      const index = (columns * row) + col;
      // console.log(col+","+row+"->"+index);
      // console.log(index+" -> "+ newArray.length);
      // newArray.push(array[index]);
      console.log ("index:" + index);
      projectsByColumns[col].push(array[index]);
      if (index < array.length) {
        newArray.push(array[index]);
        console.log ("new array:" + (newArray.length-1));
      }
    }
  }

  return newArray;
}



function openProjectDetails(project) {
  scrollX = window.scrollX;
  scrollY = window.scrollY;
  currentProject = project;

  document.querySelectorAll(".filter-button").forEach(button => {
    button.classList.add('hidden');
  });
  document.getElementById('main-back-btn').classList.remove('hidden');
  document.getElementById('project-title').innerText = project.title == undefined? "Untitled" : project.title;
  document.getElementById('project-description').innerText = project.description == undefined? "" : project.description;
  document.getElementById('project-description2').innerText = project.description2 == undefined? "" : project.description2;
  const gallery = document.getElementById('project-gallery');
  gallery.innerHTML = ''; // Clear previous images
  
  project.images.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image;
      img.alt = project.title;
      img.classList.add('mb-6');
      img.onclick = () => openLightbox(index);
      gallery.appendChild(img);
  });

  if(project.images.length <=1)
  {
    //sm:columns-2 xl:columns-2
    gallery.classList.remove('sm:columns-2');
    gallery.classList.remove('xl:columns-2');
    gallery.classList.add('sm:columns-1');
    gallery.classList.add('xl:columns-1');
  }
  else if (project.images.length ==2)
  {
    gallery.classList.remove('sm:columns-1');
    gallery.classList.remove('xl:columns-1');
    gallery.classList.add('sm:columns-2');
    gallery.classList.add('xl:columns-2');
  }
  else
  {
    gallery.classList.remove('sm:columns-1');
    gallery.classList.remove('xl:columns-1');
    gallery.classList.add('sm:columns-2');
    gallery.classList.add('xl:columns-2');
  }

  // var iframe = document.getElementById("iframe-container");
  // if (project.iframe) {
  //   iframe.classList.remove('hidden');
  //   iframe.src = project.iframe;
  //   iframe.style.width = "960px";
  //   iframe.style.height = "660px";
  // } else {
  //   iframe.classList.add('hidden');
  //   iframe.src = null;
  // }

  var projectButton = document.getElementById("project-button");
  if (project.link){
    projectButton.innerHTML = project.linkText;
    projectButton.classList.remove('hidden');
  } else {
    projectButton.classList.add('hidden');
  }
  
  document.getElementById('project-details').style.display = 'flex';
  document.getElementById('portfolio-container').style.display = 'none';

  window.scrollTo(0,0);
}

function onclickprojectbutton() {
  var url = currentProject.link;
  window.open(url, '_blank');
}

// Function to go back to the portfolio
function goBack() {
  document.getElementById('main-back-btn').classList.add('hidden');
  document.querySelectorAll(".filter-button").forEach(button => {
    button.classList.remove('hidden');
  });
  // var iframe = document.getElementById("iframe-container");
  // iframe.classList.add('hidden');
  // iframe.src = null;

  document.getElementById('about-me').classList.add('hidden');
  document.getElementById('btn-work').classList.add('hidden');
  document.getElementById('btn-about').classList.remove('hidden');

  document.getElementById('project-details').style.display = 'none';
  document.getElementById('portfolio-container').style.display = 'flex'; // Set display to grid for layout
  
  window.scrollTo(scrollX,scrollY);
}

// Function to open lightbox
// function openLightbox(image) {
//   document.getElementById('lightbox-image').src = image;
//   document.getElementById('lightbox').classList.remove('hidden');
// }

function openLightbox(index) {
  currentImageIndex = index;
  document.getElementById('lightbox-image').src = currentProject.images[currentImageIndex];
  document.getElementById('lightbox').classList.remove('hidden');
}

// Function to change image in lightbox
function changeImage(direction) {
  this.event.stopPropagation();
  this.event.cancelBubble = true;
  currentImageIndex = (currentImageIndex + direction + currentProject.images.length) % currentProject.images.length;
  document.getElementById('lightbox-image').src = currentProject.images[currentImageIndex];
}

// Function to close lightbox
function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

function showAboutMe(){
  document.getElementById('main-back-btn').classList.remove('hidden');
  document.getElementById('about-me').classList.remove('hidden');
  // document.getElementById('btn-work').classList.remove('hidden');
  document.getElementById('btn-about').classList.add('hidden');
  document.getElementById('portfolio-container').style.display = 'none';
  document.querySelectorAll(".filter-button").forEach(button => {
    button.classList.add('hidden');
  });
}

createProjectCards();

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    
    const filter = button.getAttribute("data-filter");
    
    filteredProjects = [];
    loadedProjects.forEach(item => {
      if (filter === "all" || item.category === filter) {
        filteredProjects.push(item);
      }
    });

    document.querySelectorAll(".filter-button").forEach(filterButton => {
      if (button == filterButton) {
        filterButton.classList.add('underline');
      } else {
        filterButton.classList.remove('underline');
      }
    });

    createProjectCards();
  });
});


function getCurrentBreakpoint() {
  const width = window.innerWidth;

  if (width >= 1280) {
      return 'xl';
  } else if (width >= 1024) {
      return 'lg';
  } else if (width >= 768) { // md starts at 768px
      return 'md';
  } else if (width >= 640) {
      return 'sm';
  } else {
      return 'xs';
  }
}

function getColumnsForCurrentBreakpoint() {
  const breakpoint = getCurrentBreakpoint();
  console.log("current breakpoint: " + breakpoint);
//columns-1 sm:columns-2 md:columns-3 xl:columns-4
  switch (breakpoint) {
      case 'xl':
        return 4;
      case 'lg':
          return 3;
      case 'md':
          return 3;
      case 'sm':
          return 2;
      case 'xs':
      default:
          return 1;
  }
}


window.addEventListener('resize', () => {
  console.log("prev columns: " + currentColumns);
  const newColumns = getColumnsForCurrentBreakpoint();
  console.log("new columns: " + newColumns);

  if (currentColumns != newColumns)
    createProjectCards();
});

window.addEventListener('load', function () {
  document.body.style.opacity='1';
});