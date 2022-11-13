// src/utils/time.js

export {
    time
}

const time = {

    now: () => {
        return Math.floor(Date.now() / 1000)
    }

}