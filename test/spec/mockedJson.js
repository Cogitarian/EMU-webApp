var annotationFileSchema = {"description": "Schema for annotation file for the EMU systems label file format","type": "object","properties": {"name": {"type": "string","minLength": 1},"annotates": {"type": "string","minLength": 1},"sampleRate": {"type": "integer"},"levels": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"type": {"enum": ["ITEM", "SEGMENT", "EVENT"]},"items": {"type": "array","items": {"type": "object","properties": {"id": {"type": "integer"},"sampleStart": {"type": "integer"},"sampleDur": {"type": "integer"},"samplePoint": {"type": "integer"},"labels": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"value": {"type": "string"}},"required": ["name", "value"],"additionalProperties": false}}},"required": ["id", "labels"],"additionalProperties": false}}},"required": ["name", "type", "items"],"additionalProperties": false}},"links": {"type": "array","items": {"type": "object","properties": {"fromID": {"type": "integer"},"toID": {"type": "integer"}},"required": ["fromID", "toID"],"additionalProperties": false}}},"required": ["name", "annotates", "sampleRate", "levels", "links"],"additionalProperties": false}
var bundleListSchema = {"description": "Schema for bundleList for the EMU-webApp","type": "array","items":{"type": "object","properties": {"name":{"type": "string"}},"required": ["name"],"additionalProperties": false}}
var DBconfigFileSchema = {"description": "Schema for DBconfig files for the EMU system","type": "object","properties": {"name": {"type": "string"},"UUID": {"type": "string"},"mediafileExtension": {"enum": ["wav"]},"ssffTracks": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"columnName": {"type": "string"},"fileExtension": {"type": "string"}},"required": ["name", "columnName", "fileExtension"],"additionalProperties": false}},"levelDefinitions": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"type": {"enum": ["ITEM", "SEGMENT", "EVENT"]},"attributeDefinitions": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"type": {"enum": ["string"]},"legalLabels": {"type": "array","items": {"type": "string"}}},"required": ["name", "type"],"additionalProperties": false}}},"required": ["name", "type", "attributeDefinitions"],"additionalProperties": false,"uniqueItems": true}},"linkDefinitions": {"type": "array","items": {"type": "object","properties": {"type": {"enum": ["ONE_TO_MANY", "MANY_TO_MANY", "ONE_TO_ONE"]},"superlevelName": {"type": "string"},"sublevelName": {"type": "string"}},"required": ["type", "superlevelName", "sublevelName"],"additionalProperties": false}}},"required": ["name", "UUID", "mediafileExtension", "ssffTracks", "levelDefinitions", "linkDefinitions"],"additionalProperties": false}
var globalDBSchema = {"description": "Schema for database config file for the EMU systems","type": "object","properties": {"name": {"type": "string"},"UUID": {"type": "string","pattern": "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"},"levelDefinitions": {"type": "array","minItems": 1,"items": {"type": "object","properties": {"name": {"type": "string"},"type": {"type": {"enum": ["ITEM", "EVENT", "SEGMENT"]}},"labelDefinitions": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"legalValues": {"type": "array","items": {"type": "string"}}}},"minItems": 1}}}},"linkDefinitions": {"type": "array","items": {"type": "object","properties": {"superlevelName": {"type": "string"},"sublevelName": {"type": "string"},"type": {"type": {"enum": ["ONE_TO_ONE", "ONE_TO_MANY", "MANY_TO_MANY"]}}}}},"mediafileExtension": {"type": {"enum": ["wav"]}},"ssffTracks": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"fileExtension": {"type": "string"},"columnName": {"type": "string"}}}},"EMUwebAppConfig": {"perspectives": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"signalCanvases": {"type": "object","properties": {"order": {"type": "array","minItems": 1,"items": {"type": "string"}},"assign": {"type": "array","items": {"type": "object","properties": {"SPEC": {"type": "string"},"OSCI": {"type": "string"}}}},"contourLims": {"type": "array","items": {"type": "object"}}}},"levelCanvases": {"type": "object","properties": {"order": {"type": "array","items": {"type": "string"}}}},"twoDcanvases": {"type": "object","properties": {"show": {"type": "boolean"}}}}},"minItems": 1}}},"required": ["name", "UUID"]}
var emuwebappConfigSchema = {"description": "Schema for emuwebappConfig file for the EMU-webApp","type": "object","properties": {"main": {"type": "object","properties": {"osciSpectroZoomFactor": {"type": "integer"},"autoConnect": {"type": "boolean"},"serverUrl": {"type": "string"},"serverTimeoutInterval": {"type": "integer"},"comMode": {"type": "string"},"catchMouseForKeyBinding": {"type": "boolean"}},"required": ["osciSpectroZoomFactor", "autoConnect", "serverUrl", "serverTimeoutInterval", "comMode", "catchMouseForKeyBinding"],"additionalProperties": false},"keyMappings": {"type": "object","properties": {"toggleSideBarLeft": {"type": "integer"},"toggleSideBarRight": {"type": "integer"},"zoomSel": {"type": "integer"},"zoomAll": {"type": "integer"},"zoomOut": {"type": "integer"},"zoomIn": {"type": "integer"},"shiftViewPortLeft": {"type": "integer"},"shiftViewPortRight": {"type": "integer"},"playEntireFile": {"type": "integer"},"playAllInView": {"type": "integer"},"playSelected": {"type": "integer"},"deletePreselBoundary": {"type": "integer"},"selNextPrevItem": {"type": "integer"},"selNextItem": {"type": "integer"},"selPrevItem": {"type": "integer"},"createNewItemAtSelection": {"type": "integer"},"levelUp": {"type": "integer"},"levelDown": {"type": "integer"},"undo": {"type": "integer"},"redo": {"type": "integer"},"shrinkSelSegmentsLeft": {"type": "integer"},"shrinkSelSegmentsRight": {"type": "integer"},"expandSelSegmentsRight": {"type": "integer"},"expandSelSegmentsLeft": {"type": "integer"},"selectFirstContourCorrectionTool": {"type": "integer"},"selectSecondContourCorrectionTool": {"type": "integer"},"selectThirdContourCorrectionTool": {"type": "integer"},"selectFourthContourCorrectionTool": {"type": "integer"},"selectNoContourCorrectionTool": {"type": "integer"},"selectSegmentsInSelection": {"type": "integer"},"snapBoundaryToNearestTopBoundary": {"type": "integer"},"snapBoundaryToNearestBottomBoundary": {"type": "integer"},"snapBoundaryToNearestZeroCrossing": {"type": "integer"},"shift": {"type": "integer"},"alt": {"type": "integer"},"esc": {"type": "integer"}},"required": ["toggleSideBarLeft", "toggleSideBarRight", "zoomSel", "zoomAll", "zoomOut", "zoomIn", "shiftViewPortLeft", "shiftViewPortRight", "playEntireFile", "playAllInView", "playSelected", "deletePreselBoundary", "selNextPrevItem", "selNextItem", "selPrevItem", "createNewItemAtSelection", "levelUp", "levelDown", "undo", "redo", "shrinkSelSegmentsLeft", "shrinkSelSegmentsRight", "expandSelSegmentsRight", "expandSelSegmentsLeft", "selectFirstContourCorrectionTool", "selectSecondContourCorrectionTool", "selectThirdContourCorrectionTool", "selectFourthContourCorrectionTool", "selectNoContourCorrectionTool", "selectSegmentsInSelection", "snapBoundaryToNearestTopBoundary", "snapBoundaryToNearestBottomBoundary", "snapBoundaryToNearestZeroCrossing", "shift", "alt", "esc"],"additionalProperties": false},"colors": {"type": "object","properties": {"labelColor": {"type": "string"},"osciColor": {"type": "string"},"levelColor": {"type": "string"},"appBackground": {"type": "string"},"playProgressColor": {"type": "string"},"selectedAreaColor": {"type": "string"},"selectedBorderColor": {"type": "string"},"selectedBoundaryColor": {"type": "string"},"selectedLevelColor": {"type": "string"},"selectedSegmentColor": {"type": "string"},"selectedContourColor": {"type": "string"},"startBoundaryColor": {"type": "string"},"endBoundaryColor": {"type": "string"},"zeroLineColor": {"type": "string"},"crossHairsColor": {"type": "string"},"transitionTime": {"type": "integer"}},"required": ["labelColor", "osciColor", "playProgressColor", "selectedAreaColor", "selectedBorderColor", "selectedBoundaryColor", "selectedLevelColor", "selectedSegmentColor", "startBoundaryColor", "endBoundaryColor", "zeroLineColor", "crossHairsColor", "transitionTime"],"additionalProperties": false},"font": {"type": "object","properties": {"fontType": {"type": "string"},"fontPxSize": {"type": "integer"}},"required": ["fontType", "fontPxSize"],"additionalProperties": false},"spectrogramSettings": {"type": "object","properties": {"N": {"type": "integer"},"rangeFrom": {"type": "integer"},"rangeTo": {"type": "integer"},"dynamicRange": {"type": "integer"},"window": {"enum": ["BARTLETT", "BARTLETTHANN", "BLACKMAN", "COSINE", "GAUSS", "HAMMING", "HANN", "LANCZOS", "RECTANGULAR", "TRIANGULAR"]},"preEmphasisFilterFactor": {"type": "number"},"transparency": {"type": "integer","minimum": 0,"maximum": 255},"drawHeatMapColors": {"type": "boolean"},"heatMapColorAnchors": {"type": "array","items": {"type": "array","items": {"type": "integer","minimum": 0,"maximum": 255},"minItems": 3,"maxItems": 3}}},"required": ["N", "rangeFrom", "rangeTo", "dynamicRange", "window"],"additionalProperties": false},"perspectives": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"signalCanvases": {"type": "object","properties": {"order": {"type": "array","items": {"type": "string"}},"assign": {"type": "array","items": {"type": "object","properties": {"signalCanvasName": {"type": "string"},"ssffTrackName": {"type": "string"}},"required": ["signalCanvasName", "ssffTrackName"],"additionalProperties": false}},"contourLims": {"type": "array","items": {"type": "object","properties": {"ssffTrackName": {"type": "string"},"min": {"type": "integer"},"max": {"type": "integer"}},"required": ["ssffTrackName", "min", "max"],"additionalProperties": false}}},"required": ["order", "assign", "contourLims"],"additionalProperties": false},"levelCanvases": {"type": "object","properties": {"order": {"type": "array","items": {"type": "string"}}},"required": ["order"],"additionalProperties": false},"twoDimCanvases": {"type": "object","properties": {"order": {"type": "array","items": {"type": "string"},"maxItems": 1},"twoDimDrawingDefinitions": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"dots": {"type": "array","items": {"type": "object","properties": {"name": {"type": "string"},"xSsffTrack": {"type": "string"},"xContourNr": {"type": "integer"},"ySsffTrack": {"type": "string"},"yContourNr": {"type": "integer"},"color": {"type": "string"}},"required": ["name", "xSsffTrack", "xContourNr", "ySsffTrack", "yContourNr"],"additionalProperties": false}},"connectLines": {"type": "array","items": {"type": "object","properties": {"fromDot": {"type": "string"},"toDot": {"type": "string"},"color": {"type": "string"}},"required": ["fromDot", "toDot", "color"],"additionalProperties": false}}},"required": ["name", "dots", "connectLines"],"additionalProperties": false}}},"required": ["order"],"additionalProperties": false},"required": ["name", "signalCanvases", "levelCanvases", "twoDimCanvases"],"additionalProperties": false}}},"labelCanvasConfig": {"type": "object","properties": {"addTimeMode": {"type": "string"},"addTimeValue": {"type": "integer"},"newSegmentName": {"type": "string"},"newEventName": {"type": "string"}},"required": [],"additionalProperties": false},"restrictions": {"type": "object","properties": {"playback": {"type": "boolean"},"correctionTool": {"type": "boolean"},"editItemSize": {"type": "boolean"},"editItemName": {"type": "boolean"},"deleteItemBoundary": {"type": "boolean"},"deleteItem": {"type": "boolean"},"deleteLevel": {"type": "boolean"},"addItem": {"type": "boolean"},"drawCrossHairs": {"type": "boolean"},"drawSampleNrs": {"type": "boolean"},"drawZeroLine": {"type": "boolean"},"bundleComments": {"type": "boolean"},"bundleFinishedEditing": {"type": "boolean"},"showPerspectivesSidebar": {"type": "boolean"}},"required": ["playback", "correctionTool", "editItemSize", "editItemName", "deleteItemBoundary", "deleteItem", "deleteLevel", "addItem", "drawCrossHairs", "drawSampleNrs", "drawZeroLine", "bundleComments", "bundleFinishedEditing", "showPerspectivesSidebar"],"additionalProperties": false},"activeButtons": {"type": "object","properties": {"addLevelSeg": {"type": "boolean"},"addLevelEvent": {"type": "boolean"},"renameSelLevel": {"type": "boolean"},"downloadTextGrid": {"type": "boolean"},"specSettings": {"type": "boolean"},"connect": {"type": "boolean"},"clear": {"type": "boolean"},"deleteSingleLevel": {"type": "boolean"},"resizeSingleLevel": {"type": "boolean"},"saveSingleLevel": {"type": "boolean"},"resizePerspectives": {"type": "boolean"},"openDemoDB": {"type": "boolean"},"saveBundle": {"type": "boolean"},"openMenu": {"type": "boolean"}},"required": ["addLevelSeg", "addLevelEvent", "renameSelLevel", "downloadTextGrid", "specSettings", "connect", "clear", "deleteSingleLevel", "resizeSingleLevel", "saveSingleLevel", "resizePerspectives", "openDemoDB", "saveBundle", "openMenu"],"additionalProperties": false},"demoDBs": {"type": "array","items": {"type": "string"}}},"required": ["main", "keyMappings", "colors", "font", "spectrogramSettings", "perspectives", "labelCanvasConfig", "restrictions", "activeButtons", "demoDBs"],"additionalProperties": false}