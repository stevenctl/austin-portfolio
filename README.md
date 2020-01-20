# Austin Landow - Video Production

A mostly-static site (Vimeo integration coming soon) for my brother's videography services and portfolio. 

### Built-With:
- Package Manager: [yarn](https://yarnpkg.com/)
- Component framework: [react](https://reactjs.org)
- "Frontend as a Backend" + SSR: [fusion.js](https://fusionjs.com)
- UI Library: [Chakra UI](https://chakra-ui.com)

Note: Built with node 10.14.2 and yarn 1.13.0

##### Setup
```bash
yarn # install deps
```

##### Develop:

```bash
yarn dev # run with reloads
```

##### Build:

```bash
# specify version
IMAGE_VERSION=
TAG="al-video:${IMAGE_VERSION}"
docker build -t $TAG -t $REMOTE_TAG .
```

##### Release:

```bash
REPOSITORY="austins-portfolio-265706"
REGISTRY="us.gcr.io"
REMOTE_TAG="$REGISTRY/$REPOSITORY/$TAG"
docker tag $TAG $REMOTE_TAG
docker push $REMOTE_TAG
```

Deploy the new version to [Google Cloud Run]( Visit https://console.cloud.google.com/run)

If you want to test the image locally:
```bash
if you want to run the image locally
docker run -p 3000:80 $TAG # access at localhost:3000
```