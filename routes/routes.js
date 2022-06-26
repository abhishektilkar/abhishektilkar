const express = require('express');
const { route } = require('express/lib/router');
const { USE_PROXY } = require('http-status-codes');
require('dotenv').config();
const {Octokit} = require('octokit');

const router = express.Router()



const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})
console.log(2)






// Create an API endpoint that can create a repo with the name provided by the user
// router.
router.post('/v1/repo', async (req, res) => {

    
    let { reponame, description, visibility } = req.body;
    
    if (!description) {
        description = "a";
    }
    if(!visibility || visibility === 'private') {
        visibility = true;
    }
    else{
        visibility = false
    }
    console.log(1)

    const logedinUser = (await octokit.request('GET /user')).data.login
    // res.send(logedinUser)

    this.name = logedinUser
    console.log(3)
    const val = await octokit.request('POST /user/repos', {
        name:logedinUser
    })
    console.log(4)

    res.json(val)
})
// end

// Create an API endpoint that can list all Repos of a User
router.get('/v1/repos', async function(req,res) {

    let { username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const val = await octokit.request('GET /users/{username}/repos', {
        username: username
      })

    res.json(val)
})
// end

// Create API endpoints for listing, updating, and deleting repo topics
router.patch('/v1/repos', async function(req,res) {

    let { reponame, username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const val = await octokit.request('PATCH /repos/{owner}/{repo}', {
        owner: username,
        repo: reponame,
        name: 'Hello-World',
        description: 'This is your first repository',
        homepage: 'https://github.com',
        'private': true,
        has_issues: true,
        has_projects: true,
        has_wiki: true
    })

    res.json(val)
})

// end

// get all repositories topics
router.get('/v1/repotopics', async function(req,res) {

    let { reponame, username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const val = await octokit.request('GET /repos/{owner}/{repo}/topics', {
        owner: username,
        repo: reponame
      })

    res.json(val)
})
// end aA|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// update all repositories topics
router.put('/v1/repotopics', async function(req,res) {

    let { reponame, username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const val = await octokit.request('PUT /repos/{owner}/{repo}/topics', {
        owner: username,
        repo: reponame,
        names: [
          'octocat',
          'atom',
          'electron',
          'api'
        ]
      })

    res.json(val)
})

// end


// Create API endpoints for listing all contributors, stargazers
router.get('/v1/repos/contriandstargaz', async function(req,res) {

    let { reponame, username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const stargazers = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
        owner: username,
        repo: reponame
    })

    const contributors = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
        owner: username,
        repo: reponame
    })

    res.send({stargazers, contributors})
})
// end

// Create an API endpoint to list all the stargazers
router.get('/v1/repos/stargazers', async function(req,res) {

    let { reponame, username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const val = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
        owner: username,
        repo: reponame
    })

    res.send(val)

}) 
// end aA


//Star a repository for the authenticated user
router.post('/v1/repos/star', async function(req,res) {

    let { reponame, username } = req.body;
    
    const logedinUser = (await octokit.request('GET /user')).data.login
    
    // res.send(logedinUser)
    
    if(!username) {
        username = logedinUser
    }

    const val = await octokit.request('PUT /user/starred/{owner}/{repo}', {
        owner: username,
        repo: reponame
    })

    res.send(val)


})


module.exports = router;