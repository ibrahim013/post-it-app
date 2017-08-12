<h1>Post-it-app </h1>
<p>This is an application that allow its users to create groups and broadcast messeges. A RESTful api, that provided for signing in and out, creating groups, brodcrasting messages and adding users to groups. </p>

<h2>Url</h2>
localhost:3000/

<h2>Method</h2>
'POST'

<h2>Url Params</h2>

/user/signin

```
** Add user signin ** 

email: string
password: string
```

/user/signup

```
** user signup **

username: string
email: string
password: string
```

/user/passwordreset

```
** Password reset **

email:string
```

/group

```
** Add group **

groupname: string

```

/group/groupid/user

```
** Add members to group **

groupname: string
groupmember: string
```

