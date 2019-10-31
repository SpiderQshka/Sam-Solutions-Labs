const moveDot = (container, dot, e, [dotOne, dotTwo]) => {
    const containerCoords = container.getBoundingClientRect();
    const dotCoords = dot.getBoundingClientRect();
    const isDotOutOfContainerRight = 
        (containerCoords.width 
        - (Number.parseFloat(e.target.style.left) || 0)
        - dotCoords.width) < 0
    const isDotOutOfContainerLeft = 
        (Number.parseFloat(e.target.style.left) || 0) < 0;

    if(!(isDotOutOfContainerRight || isDotOutOfContainerLeft)){
        dot.style.left = `${e.pageX - containerCoords.x - dot.offsetWidth / 2}px`;
    }
    else if(isDotOutOfContainerRight){
        dot.style.left = containerCoords.width - dot.offsetWidth + 'px';
        console.warn('out of container right')
    }
    else if(isDotOutOfContainerLeft){
        dot.style.left = 0 + 'px';
        console.warn('out of container left')
    }
}

const areMaxRighterThanMin = (minDot, maxDot) => {
    const maxDotCoords = maxDot.getBoundingClientRect();
    const minDotCoords = minDot.getBoundingClientRect();
    return minDotCoords.x + minDotCoords.width + 20 < maxDotCoords.x
}

const createRange = () => {
    const container = document.createElement('div');
    container.classList.add('range-container')
    const dotOne = document.createElement('div');
    const dotTwo = document.createElement('div');
    dotOne.classList.add('min');
    dotOne.style.left = 0;
    dotTwo.style.right = 0;
    dotTwo.classList.add('max');
    container.appendChild(dotOne);
    container.appendChild(dotTwo);
    [dotOne, dotTwo].forEach(
        dot => {
            dot.classList.add('dot')
            dot.ondragstart = () => false;
            dot.onmousedown = () => {
                dot.onmousemove = e => {
                    moveDot(container, dot, e, [dotOne, dotTwo]);
                };
                dot.onmouseup = () => {
                    dot.onmousemove = null;
                    dot.onmouseup = null;
                }
                dot.onmouseleave = () => {
                    dot.onmousemove = null;
                    dot.onmouseup = null;
                }
            }
        }
            
            
                
    )
    return container;
}

export default createRange;