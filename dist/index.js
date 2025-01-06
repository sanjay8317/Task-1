// cards
fetch('./cards.json')
    .then(Response => Response.json())
    .then(data => {

        const cardscont = document.getElementById('cards');
        const showInHtml = data.map((items) => {
            return `
        <div
                    class="flex justify-between gap-3 border border-solid border-slate-300 rounded-lg px-10 py-8 w-auto lg:w-[31%] sm:w-[100%]">
                    <!-- card1left -->
                    <div class="flex flex-col gap-2 ">
                        <div class="flex gap-2 items-center">
                            <div class="w-5 h-5">
                                <img src="${items.image}" alt="">
                            </div>
                            <div>
                                <h1>${items.name}</h1>
                            </div>
                        </div>

                        <div class="flex items-center gap-2">
                            <div>
                                <p class="text-3xl font-semibold">${items.amount}</p>
                            </div>
                            <div class="flex gap-1 items-center">
                                <div>
                                    <p class="">${items.percentage}</p>
                                </div>
                                <div><img src="${items.arrowimage}" alt=""></div>
                            </div>
                        </div>

                        <div>
                            <p class="text-gray-400">${items.LastPeriod}</p>
                        </div>
                    </div>

                    <!-- card1right -->
                    <div>
                        <p class="text-gray-400">${items.Days}</p>
                    </div>
                </div>
        
        `
        }).join('');


        cardscont.innerHTML = showInHtml;

    })

    .catch(error => console.error('Error fetching JSON:', error));








// DOM Elements
const elements = {
    rowsContainer: document.getElementById('rowdata'),
    searchInput: document.getElementById('search'),
    sortButton: document.getElementById('sort'),
    filterButton: document.getElementById("filterButton"),
    filterMenu: document.getElementById("filterMenu")
};

// Configuration
const STATUS_STYLES = {
    Success: { bgColor: "bg-green-200", textColor: "text-green-600" },
    Pending: { bgColor: "bg-slate-200", textColor: "text-slate-400" },
    Failed: { bgColor: "bg-red-400", textColor: "text-red-600" }
};

// State
let state = {
    originalData: [],
    filteredData: [],
    isSorted: false
};

// Render function for table rows
function renderRows(dataToRender) {
    const resultRows = dataToRender.map(item => {
        const { bgColor, textColor } = STATUS_STYLES[item.status] || {
            bgColor: "bg-gray-200",
            textColor: "text-gray-600"
        };

        return `
            <div class="flex justify-between items-center py-2 border border-y-1 border-slate-200 border-x-0">
                <div class="flex gap-2 items-center flex-1">
                    <img 
                        src="${item.image}" 
                        alt="${item.name}" 
                        class="w-10 h-10 rounded-full object-cover"
                        onerror="this.src='placeholder.jpg'"
                    >
                    <div>
                        <p class="text-sm font-medium">${item.name}</p>
                        <p class="text-gray-400">${item.date}</p>
                    </div>
                </div>
                <div class="flex flex-col items-center flex-1">
                    <p>${item.amount}</p>
                    <p class="text-gray-400">${item.usd}</p>
                </div>
                <div class="flex items-center justify-center flex-1">
                    <div class="flex ${bgColor} w-20 h-8 justify-center items-center rounded-xl">
                        <span class="${textColor}">${item.status}</span>
                    </div>
                </div>
                <div class="flex flex-col items-center flex-1">
                    <p>${item.transactionMode}</p>
                    <p class="text-gray-400">${item.transactionNumber}</p>
                </div>
            </div>
        `;
    }).join('');

    elements.rowsContainer.innerHTML = resultRows;
}

// Search functionality
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const searchedData = state.filteredData.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.transactionNumber.toLowerCase().includes(query)
    );
    renderRows(searchedData);
}

// Sort functionality
function handleSort() {
    state.isSorted = !state.isSorted;
    const sortedData = [...state.filteredData].sort((a, b) => 
        state.isSorted ? a.amount - b.amount : b.amount - a.amount
    );
    renderRows(sortedData);
}

// Filter functionality
function handleFilter(status) {
    state.filteredData = status === "all" 
        ? [...state.originalData]
        : state.originalData.filter(item => item.status === status);
    
    renderRows(state.filteredData);
    elements.filterMenu.classList.add("hidden");
}

// Initialize the application
async function intializepage() {
    try {
        // Show loading state
        elements.rowsContainer.innerHTML = '<div class="text-center py-4">Loading...</div>';

        const response = await fetch('./rowdata.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        state.originalData = data;
        state.filteredData = [...data];

        // Initial render
        renderRows(state.filteredData);

        // Set up event listeners
        elements.searchInput.addEventListener('input', handleSearch);
        elements.sortButton.addEventListener('click', handleSort);
        elements.filterButton.addEventListener('click', (e) => {
            elements.filterMenu.classList.toggle("hidden");
            e.stopPropagation();
        });

        // Close filter menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.filterButton.contains(e.target) && 
                !elements.filterMenu.contains(e.target)) {
                elements.filterMenu.classList.add("hidden");
            }
        });

        // Set up filter menu items
        elements.filterMenu.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", (e) => {
                const selectedStatus = e.target.getAttribute("data-status");
                handleFilter(selectedStatus);
            });
        });

    } catch (error) {
        console.error('Error:', error);
        elements.rowsContainer.innerHTML = `
            <div class="text-red-500 text-center py-4">
                Error loading data. Please try again later.
            </div>
        `;
    }
}


intializepage();





    //see all button(I'm using same image for multiple times)

    let imagesVisible = false;

    document.getElementById('seeAllButton').addEventListener('click', function() {
        const imageContainer = document.getElementById('imageContainer');
        const imageSrc = "Screenshot 2025-01-02 173429.png"; 
        const numberOfImages = 2;
    
    
        if (imagesVisible) {
            imageContainer.innerHTML = ""; 
            imagesVisible = false; 
            return; 
        }
    
        
        for (let i = 0; i < numberOfImages; i++) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('mb-4'); 
    
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = "Image " + (i + 1);
            img.classList.add('w-[330px]');
    
            imageDiv.appendChild(img);
            imageContainer.appendChild(imageDiv);
        }
    
       
         imagesVisible = true;
    });
    
    
    






//chart

const xValues = ["18 OCT", "25 OCT", "2 NOV", "9 NOV"];
const yValues = [55, 49, 44, 24, 15];
const barColors = ["red", "green", "blue", "orange"];

new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: ""
        }
    }
});





//menu

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');  // Add this line
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = true;
    mobileMenu.classList.add('translate-x-0');
    mobileMenu.classList.remove('translate-x-full');
});

closeBtn.addEventListener('click', () => {  // Add close button functionality
    isMenuOpen = false;
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
});

