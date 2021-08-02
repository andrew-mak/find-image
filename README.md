# Image Finder

*This project is implemented according to tasks from dev test task document.* 

Deployed on vercel.app 

demo: [find-image-am.vercel.app](https://find-image-am.vercel.app/)

src: [andrew-mak github](https://github.com/andrew-mak/find-image)

## main tech stack:
* bootstrapped with Create React App
* React
* React Router
* TypeScript
* Chakra UI

### extra packages:
* react-icons
* react-tag-input
* react-idle-timer
* auth0/auth0-react

### used APIs:
* [Flickr:](https://www.flickr.com/services/api/)
  - search images by text in title or tags;
* [Firebase:](https://console.firebase.google.com/)
  - user's authentication
* [Evernote](https://dev.evernote.com/doc/start/javascript.php) (*not finished*)
* [Pocket](https://getpocket.com/developer/docs/v3/add) (not finished, *problem with preflight request before authorize and it response with no cors header, that browsers strongly required*)

## Covered functionality:
1. simple email/password athentication with Firbase
2. simple images search by text in title/tags (search with Flickr)
3. simple paggination
4. user's bookmarks: currently items stored in localStorage
5. user's tags for any item in bookmarks (*create, delete*)
6. auto timeout user's session (separate for every tab) with preceding alert message
7. UI elements: toasts, tooltips, spinner
