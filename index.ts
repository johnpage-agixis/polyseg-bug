import { init } from '@cornerstonejs/tools';
import * as polySeg from '@cornerstonejs/polymorphic-segmentation';

// initialising as described
await init({
  addons: {
    /*
Type 'typeof import(".../node_modules/@cornerstonejs/polymorphic-segmentation/dist/esm/index")' is not assignable to type 'PolySegAddOn'.
  Types of property 'canComputeRequestedRepresentation' are incompatible.
    Type '(segmentationId: string, type: typeof SegmentationRepresentations) => boolean' is not assignable to type '(segmentationId: string, representationType: SegmentationRepresentations) => boolean'.
      Types of parameters 'type' and 'representationType' are incompatible.
        Type 'import(".../node_modules/@cornerstonejs/tools/dist/esm/enums/SegmentationRepresentations").default' is not assignable to type 'typeof SegmentationRepresentations'.ts(2322)
config.d.ts(21, 5): The expected type comes from property 'polySeg' which is declared here on type 'AddOns'
    */
    polySeg,
  },
});

// trying to circumvent the error
await init({
  addons: {
    polySeg: {
        /*
Argument of type 'import(".../node_modules/@cornerstonejs/tools/dist/esm/enums/SegmentationRepresentations").default' is not assignable to parameter of type 'typeof SegmentationRepresentations'.ts(2345)
(parameter) type: SegmentationRepresentations
        */
        canComputeRequestedRepresentation: (segId, type) => polySeg.canComputeRequestedRepresentation(segId, type),
        init: polySeg.init,
        computeContourData: polySeg.computeContourData,
        computeLabelmapData: polySeg.computeLabelmapData,
        computeSurfaceData: polySeg.computeSurfaceData,
        updateSurfaceData: segId => polySeg.updateSurfaceData(segId).then(_ => null!),
    },
  },
});