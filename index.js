class Carousel {
    constructor(className, images, appendTo) {
        this.className = className
        this.images = images
        this.appendTo = document.querySelector(`.${appendTo}`)
        this.idx = 0
        this.selectorIdx = 0
        this.imageElements = [] // store created <img> elements so we can show/hide them
    }

    createCarousel() {
        const imgCont = document.createElement('div')
        imgCont.classList.add('img-cont')
        this.appendTo.appendChild(imgCont)

        const top = document.createElement('div')
        top.classList.add('top')
        imgCont.appendChild(top)

        const left = document.createElement('img')
        left.src = './assets/back.png'
        left.classList.add('left')
        top.appendChild(left)

        const imagesContainer = document.createElement('div')
        imagesContainer.classList.add('images')
        top.appendChild(imagesContainer)

        const bottom = document.createElement('div')
        bottom.classList.add('bottom')
        imgCont.appendChild(bottom)

        let picture;
        let selectorList = [];
        let selIdx = [];
        let selector;
        for (let i = 0; i < this.images.length; i++) {
            picture = document.createElement('img')
            picture.src = this.images[i]
            picture.style.display = 'none' // hide initially
            imagesContainer.appendChild(picture)
            this.imageElements.push(picture)

            selector = document.createElement('div')
            selector.classList.add('selector')
            this.selNum++
            selIdx.push(this.selNum)
            bottom.appendChild(selector)
            selectorList.push(selector)

        }

        // show the first image if present
        if (this.imageElements.length > 0) {
            this.imageElements[this.idx].style.display = 'block'
            selectorList[this.idx].style.backgroundColor = 'aquamarine'
            // keep selector index in sync with shown image
            this.selectorIdx = this.idx
        }

        const right = document.createElement('img')
        right.src = './assets/forward.png'
        right.classList.add('right')
        top.appendChild(right)


        right.addEventListener('click', () => {
            if (this.imageElements.length === 0) return
            this.imageElements[this.idx].style.display = 'none'

            this.idx++
            this.selectorIdx++
            if (this.idx === this.imageElements.length && this.selectorIdx === selectorList.length) {
                this.idx = 0
                this.selectorIdx = 0
                // reset all selectors to gray then highlight current below
                selectorList.forEach(s => s.style.backgroundColor = 'gray')
            }

            this.imageElements[this.idx].style.display = 'block'
            console.log(`${this.idx} -> ${this.imageElements[this.idx].src}`)

            // update selector colors safely
            selectorList.forEach(s => s.style.backgroundColor = 'gray')
            selectorList[this.selectorIdx].style.backgroundColor = 'aquamarine'
            // reset inactivity timer on user action
            startInactivityTimer()
        })

        left.addEventListener('click', () => {
            if (this.imageElements.length === 0) return
            this.imageElements[this.idx].style.display = 'none'

            this.idx--
            this.selectorIdx--
            if (this.idx < 0 && this.selectorIdx < 0) {
                this.idx = this.imageElements.length - 1
                this.selectorIdx = this.imageElements.length - 1
                selectorList.forEach(s => s.style.backgroundColor = 'gray')
            }

            this.imageElements[this.idx].style.display = 'block'
            console.log(`${this.idx} -> ${this.imageElements[this.idx].src}`)

            selectorList.forEach(s => s.style.backgroundColor = 'gray')
            selectorList[this.selectorIdx].style.backgroundColor = 'aquamarine'
            // reset inactivity timer on user action
            startInactivityTimer()
        })

        // clicking a selector jumps to that image index
        selectorList.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (this.imageElements.length === 0) return
                // hide current and reset all selectors
                this.imageElements[this.idx].style.display = 'none'
                selectorList.forEach(s => s.style.backgroundColor = 'gray')

                // jump to clicked index
                this.idx = index
                this.selectorIdx = index

                this.imageElements[this.idx].style.display = 'block'
                selectorList[this.idx].style.backgroundColor = 'aquamarine'
                console.log(`jump -> ${this.idx} -> ${this.imageElements[this.idx].src}`)
                // reset inactivity timer on user action
                startInactivityTimer()
            })
        });

        // inactivity auto-advance: advance to next image after 5s of no interaction
        let inactivityTimer = null
        const startInactivityTimer = () => {
            clearTimeout(inactivityTimer)
            inactivityTimer = setTimeout(() => {
                if (this.imageElements.length === 0) return
                // hide current
                this.imageElements[this.idx].style.display = 'none'
                // advance indices with wrap
                this.idx++
                this.selectorIdx++
                if (this.idx >= this.imageElements.length) {
                    this.idx = 0
                    this.selectorIdx = 0
                }
                // show next and update selectors
                this.imageElements[this.idx].style.display = 'block'
                selectorList.forEach(s => s.style.backgroundColor = 'gray')
                selectorList[this.selectorIdx].style.backgroundColor = 'aquamarine'
                console.log(`auto -> ${this.idx} -> ${this.imageElements[this.idx].src}`)
                // schedule next auto-advance
                startInactivityTimer()
            }, 5000) // 5 seconds
        }

        // reset timer on user interactions
        imgCont.addEventListener('mousemove', startInactivityTimer)
        imgCont.addEventListener('touchstart', startInactivityTimer)
        right.addEventListener('click', startInactivityTimer)
        left.addEventListener('click', startInactivityTimer)
        selectorList.forEach(item => item.addEventListener('click', startInactivityTimer))

        // start the inactivity timer initially
        startInactivityTimer()

    }

}


const pics = ['./assets/door.jpg', './assets/typewriter.jpg', './assets/sign.jpg']


const pp = new Carousel('hi', pics, 'content').createCarousel()

export default Carousel