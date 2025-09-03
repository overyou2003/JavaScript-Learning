document.addEventListener('DOMContentLoaded' , () => {
    const login = document.getElementById('login')
    const userArea = document.getElementById('userArea')

    login.addEventListener('submit' , async (e) => {
        e.preventDefault()
        console.log('test')
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const btnLogin = document.getElementById('btnLogin')
        btnLogin.textContent = 'Loading...'
        btnLogin.disabled = true
        
        try {
            const response = await fetch('https://dummyjson.com/auth/login' , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username,password})
            })
            if (response.ok) {
                const data = await response.json()
                alert(JSON.stringify(data))
                const token = data.accessToken
                login.style.display = 'none'
                userArea.style.display = 'block'
                const btnGetCurrentUser = document.getElementById('btnGetCurrentUser')
                btnGetCurrentUser.addEventListener('click' , async (e) => {
                    try {
                        const response = await fetch('https://dummyjson.com/users/me' , {
                            headers: { Authorization: `Bearer ${token}` } ,
                        })
                        if (response.ok) {
                            const data = await response.json();
                            alert(`HELLO , ${data.firstName}`)
                        } else {
                            throw new Error(response.statusText)
                        }
                    } catch(error) {
                        alert(error.message)
                    }
                })
            } else {
                throw new Error('Login Failed')
            }
        } catch(error) {
            alert(error.message)
        } finally {
            btnLogin.textContent = 'Login'
            btnLogin.disabled = false
        }
    })
})