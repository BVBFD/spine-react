import {
  AssetManager,
  SkeletonRenderer,
  AtlasAttachmentLoader,
  SkeletonJson,
  Skeleton,
  AnimationStateData,
  AnimationState,
} from '@esotericsoftware/spine-canvas';

export const LoadSpineAnimation = (assetsLocalUrl, atlasFile, jsonFile) => {
  let lastFrameTime = Date.now() / 1000;
  let canvas, context;
  let assetManager;
  let skeleton, animationState, bounds;
  let skeletonRenderer;

  async function load() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    skeletonRenderer = new SkeletonRenderer(context);

    //   Load the assets.
    assetManager = new AssetManager(assetsLocalUrl);
    assetManager.loadText(jsonFile);
    assetManager.loadTextureAtlas(atlasFile);
    await assetManager.loadAll();

    // Create the texture atlas and skeleton data.
    let atlas = assetManager.require(atlasFile);
    let atlasLoader = new AtlasAttachmentLoader(atlas);
    let skeletonJson = new SkeletonJson(atlasLoader);
    let skeletonData = skeletonJson.readSkeletonData(
      assetManager.require(jsonFile)
    );

    // Instantiate a new skeleton based on the atlas and skeleton data.
    skeleton = new Skeleton(skeletonData);
    skeleton.setToSetupPose();
    skeleton.updateWorldTransform();
    bounds = skeleton.getBoundsRect();

    // Setup an animation state with a default mix of 0.2 seconds.
    var animationStateData = new AnimationStateData(skeleton.data);
    animationStateData.defaultMix = 0.2;
    animationState = new AnimationState(animationStateData);

    // Set the run animation, looping.
    animationState.setAnimation(0, 'run', true);

    // Start rendering.
    requestAnimationFrame(render);
  }

  function render() {
    // Calculate the delta time between this and the last frame in seconds.
    var now = Date.now() / 1000;
    var delta = now - lastFrameTime;
    lastFrameTime = now;

    // Resize the canvas drawing buffer if the canvas CSS width and height changed
    // and clear the canvas.
    if (
      canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight
    ) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Center the skeleton and resize it so it fits inside the canvas.
    skeleton.x = canvas.width / 2;
    skeleton.y = canvas.height - canvas.height * 0.1;
    let scale = (canvas.height / bounds.height) * 0.8;
    skeleton.scaleX = scale;
    skeleton.scaleY = -scale;

    // Update and apply the animation state, update the skeleton's
    // world transforms and render the skeleton.
    animationState.update(delta);
    animationState.apply(skeleton);
    skeleton.updateWorldTransform();
    skeletonRenderer.draw(skeleton);

    requestAnimationFrame(render);
  }

  load();
};

export const SpineCanvasRenderer = (styleObj) => {
  return <canvas id='canvas' style={styleObj}></canvas>;
};
