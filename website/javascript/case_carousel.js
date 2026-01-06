// Case Study Carousel functionality

document.addEventListener('DOMContentLoaded', function() {
    // Question Cases data
    const questionCases = [
        { name: 'Pattern Recognition', file: 'pattern' },
        { name: 'Anomaly Detection', file: 'anomaly' },
        { name: 'Noise Understanding', file: 'noise' },
        { name: 'Similarity Analysis', file: 'similarity' },
        { name: 'Etiological Reasoning', file: 'etiological' },
        { name: 'Numerical Reasoning', file: 'numerical' },
        { name: 'Temporal Relation Reasoning', file: 'temporal' },
        { name: 'Abductive Reasoning', file: 'abductive' },
        { name: 'Deductive Reasoning', file: 'deductive' },
        { name: 'Inductive Reasoning', file: 'inductive' },
        { name: 'Causal Discovery', file: 'causal' },
        { name: 'Time Series Forecasting', file: 'forecasting' },
        { name: 'Event Prediction', file: 'event' },
        { name: 'Qualitative Decision-Making', file: 'qualitative_decision' },
        { name: 'Quantitative Decision-Making', file: 'quantitative' }
    ];

    // Error Cases data
    const errorCases = [
        { name: 'Perception Error', file: 'perception_error' },
        { name: 'Reasoning Error', file: 'reasoning_error' },
        { name: 'Domain Knowledge Error', file: 'domain_knowledge_error' },
        { name: 'Question Understanding Error', file: 'question_error' }
    ];

    // Initialize carousels
    initCarousel('question-carousel', questionCases, 'question');
    initCarousel('error-carousel', errorCases, 'error');
});

function initCarousel(carouselId, cases, type) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const imageContainer = carousel.querySelector('.case-image-container');
    const title = carousel.querySelector('.case-title');
    const prevBtn = carousel.querySelector('.prev-case');
    const nextBtn = carousel.querySelector('.next-case');
    const counter = carousel.querySelector('.case-counter');

    let currentIndex = 0;

    function updateCase() {
        const currentCase = cases[currentIndex];
        
        // Update image
        imageContainer.innerHTML = `
            <img src="website/img/cases/${type}_${currentCase.file}.png" 
                 alt="${currentCase.name}" 
                 class="case-image"
                 onerror="this.onerror=null; this.src='website/img/cases/placeholder.png';">
        `;
        
        // Update title
        title.textContent = currentCase.name;
        
        // Update counter
        counter.textContent = `${currentIndex + 1} / ${cases.length}`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === cases.length - 1;
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCase();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cases.length - 1) {
            currentIndex++;
            updateCase();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only respond if the carousel is visible
        const rect = carousel.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCase();
            } else if (e.key === 'ArrowRight' && currentIndex < cases.length - 1) {
                currentIndex++;
                updateCase();
            }
        }
    });

    // Initialize first case
    updateCase();
}
