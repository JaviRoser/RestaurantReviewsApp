// Service Worker Registration
//  08/12/18
//  to support offline experience

// 

if ('serviceWorker' in navigator) {
    console.log('Service Worker registration in progres');
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js', { scope: './' })
            .then((reg) => {
                // Registration Worked
                console.log('serviceWorker registration succesful with scope: ' + reg.scope)
            }).catch((err) => {
                //Registration failed
                console.log('serviceWorker Registration failed:', err)
            })
    })

};