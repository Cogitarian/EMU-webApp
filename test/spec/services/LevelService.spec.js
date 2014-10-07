'use strict';

describe('Service: LevelService', function () {

  // load the controller's module
  beforeEach(module('emuwebApp'));
  
  var item;

  /**
   *
   */
  it('should set level data and max Element id', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.data).toEqual(JDR10_bndl.annotation);
    expect(LevelService.maxItemID).toEqual(4);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.maxItemID).toEqual(42);
  }));

  /**
   *
   */
  it('should raise max Element id', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    LevelService.raiseId(1);
    expect(LevelService.maxItemID).toEqual(5);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    LevelService.raiseId(1);
    expect(LevelService.maxItemID).toEqual(43);
  }));

  /**
   *
   */
  it('should lower max Element id', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    LevelService.lowerId(1);
    expect(LevelService.maxItemID).toEqual(3);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    LevelService.lowerId(1);
    expect(LevelService.maxItemID).toEqual(41);
  }));

  /**
   *
   */
  it('should return level details', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.name).toEqual('Phonetic');
    expect(LevelService.getLevelDetails('Phonetic').level.type).toEqual('SEGMENT');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getLevelDetails('TB').level.name).toEqual('TB');
    expect(LevelService.getLevelDetails('TB').level.type).toEqual('SEGMENT');
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
  }));

  /**
   *
   */
  it('should return element order by passing id', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getOrderById('Phonetic', 3)).toEqual(0);
    expect(LevelService.getOrderById('Phonetic', 0)).toEqual(1);
    expect(LevelService.getOrderById('Phonetic', 1)).toEqual(2);
    expect(LevelService.getOrderById('Phonetic', 4)).toEqual(3);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getOrderById('TB', 40)).toEqual(0);
    expect(LevelService.getOrderById('TB', 41)).toEqual(1);
  }));

  /**
   *
   */
  it('should return element id by passing order', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getIdByOrder('Phonetic', 0)).toEqual(3);
    expect(LevelService.getIdByOrder('Phonetic', 1)).toEqual(0);
    expect(LevelService.getIdByOrder('Phonetic', 2)).toEqual(1);
    expect(LevelService.getIdByOrder('Phonetic', 3)).toEqual(4);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getIdByOrder('TB', 0)).toEqual(40);
    expect(LevelService.getIdByOrder('TB', 1)).toEqual(41);
  }));

  /**
   *
   */
  it('should get element (segment) details by passing name and order', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    // first item has id 3
    item = getItemFromJSON(JDR10_bndl.annotation, 3);
    expect(LevelService.getItemDetails('Phonetic', 0).id).toEqual(item.id);
    expect(LevelService.getItemDetails('Phonetic', 0).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemDetails('Phonetic', 0).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemDetails('Phonetic', 0).labels).toEqual(item.labels);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    // first item has id 40
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 40);
    expect(LevelService.getItemDetails('TB', 0).id).toEqual(item.id);
    expect(LevelService.getItemDetails('TB', 0).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemDetails('TB', 0).sampleDur).toEqual(item.sampleDur)
    expect(LevelService.getItemDetails('TB', 0).labels).toEqual(item.labels);
  }));

  /**
   *
   */
  it('should get last element details by passing name', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    // last item has id 4 
    item = getItemFromJSON(JDR10_bndl.annotation, 4);
    expect(LevelService.getLastItem('Phonetic').id).toEqual(item.id);
    expect(LevelService.getLastItem('Phonetic').sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getLastItem('Phonetic').sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getLastItem('Phonetic').labels).toEqual(item.labels);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    // last element has id 41
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 41);
    expect(LevelService.getLastItem('TB').id).toEqual(item.id);
    expect(LevelService.getLastItem('TB').sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getLastItem('TB').sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getLastItem('TB').labels).toEqual(item.labels);
  }));

  /**
   *
   */
  it('should get next element details by passing name and id', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    // next item has id 4 
    item = getItemFromJSON(JDR10_bndl.annotation, 4);
    expect(LevelService.getNextItem('Phonetic', 1).id).toEqual(item.id);
    expect(LevelService.getNextItem('Phonetic', 1).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getNextItem('Phonetic', 1).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getNextItem('Phonetic', 1).labels).toEqual(item.labels);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    // next item has id 41
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 41);
    expect(LevelService.getNextItem('TB', 40).id).toEqual(item.id);
    expect(LevelService.getNextItem('TB', 40).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getNextItem('TB', 40).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getNextItem('TB', 40).labels).toEqual(item.labels);
  }));

  /**
   *
   */
  it('should get element details by passing name and id', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    // item has id 3
    item = getItemFromJSON(JDR10_bndl.annotation, 3);
    expect(LevelService.getItemFromLevelById('Phonetic', 3).id).toEqual(item.id);
    expect(LevelService.getItemFromLevelById('Phonetic', 3).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 3).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('Phonetic', 3).labels).toEqual(item.labels);


    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    // item has id 40
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 40);
    expect(LevelService.getItemFromLevelById('TB', 40).id).toEqual(item.id);
    expect(LevelService.getItemFromLevelById('TB', 40).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('TB', 40).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('TB', 40).labels).toEqual(item.labels);
  }));

  /**
   *
   */
  it('should set and get lasteditAreaElem', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setlasteditAreaElem('a');
    expect(LevelService.getlasteditAreaElem()).toEqual('a');
  }));

  /**
   *
   */
  it('should set and get lasteditArea', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    LevelService.setlasteditArea('_1');
    expect(LevelService.getlasteditArea()).toEqual('_1');
    expect(LevelService.getlastID()).toEqual('1');
  }));

  /**
   *
   */
  it('should insert a new element on level', inject(function (LevelService, viewState, ConfigProviderService) {
    // test on JDR10_bndl.annotation
    ConfigProviderService.curDbConfig = epgdorsalDbConfig;
    viewState.setCurLevelAttrDefs(epgdorsalDbConfig.levelDefinitions);
    LevelService.setData(JDR10_bndl.annotation);
    LevelService.insertItemDetails(5, 'Phonetic', 0, 'test', 87610, 100);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(5);
    expect(LevelService.getItemDetails('Phonetic', 0).id).toEqual(5);
    expect(LevelService.getItemDetails('Phonetic', 0).sampleStart).toEqual(87610);
    expect(LevelService.getItemDetails('Phonetic', 0).sampleDur).toEqual(100);
    expect(LevelService.getItemDetails('Phonetic', 0).labels[0].name).toEqual('Phonetic');
    expect(LevelService.getItemDetails('Phonetic', 0).labels[0].value).toEqual('test');
    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    ConfigProviderService.curDbConfig = emaDbConfig;
    viewState.setCurLevelAttrDefs(emaDbConfig.levelDefinitions);
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    LevelService.insertItemDetails(112, 'TB', 0, 'test', 29509, 100);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(3);
    expect(LevelService.getItemDetails('TB', 0).id).toEqual(112);
    expect(LevelService.getItemDetails('TB', 0).sampleStart).toEqual(29509);
    expect(LevelService.getItemDetails('TB', 0).sampleDur).toEqual(100);
    expect(LevelService.getItemDetails('TB', 0).labels[0].name).toEqual('TB');
    expect(LevelService.getItemDetails('TB', 0).labels[0].value).toEqual('test');
  }));

  /**
   *
   */
  it('should change element (segment) details on level based on name and id', inject(function (LevelService, viewState) {
    // test on JDR10_bndl.annotation
    viewState.setCurLevelAttrDefs(epgdorsalDbConfig.levelDefinitions);
    LevelService.setData(JDR10_bndl.annotation);
    LevelService.updateSegItemInLevel('Phonetic', 3, 'test', 0, 87700, 939);
    expect(LevelService.getItemDetails('Phonetic', 0).id).toEqual(3);
    expect(LevelService.getItemDetails('Phonetic', 0).sampleStart).toEqual(87700);
    expect(LevelService.getItemDetails('Phonetic', 0).sampleDur).toEqual(939);
    expect(LevelService.getItemDetails('Phonetic', 0).labels[0].name).toEqual('Phonetic');
    expect(LevelService.getItemDetails('Phonetic', 0).labels[0].value).toEqual('test');

    // // test on dfgspp_mo1_prosody_0024_bndl.annotation
    viewState.setCurLevelAttrDefs(emaDbConfig.levelDefinitions);
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    LevelService.updateSegItemInLevel('TB', 40, 'test', 0, 29604, 2700);
    expect(LevelService.getItemDetails('TB', 0).id).toEqual(40);
    expect(LevelService.getItemDetails('TB', 0).sampleStart).toEqual(29604);
    expect(LevelService.getItemDetails('TB', 0).sampleDur).toEqual(2700);
    expect(LevelService.getItemDetails('TB', 0).labels[0].name).toEqual('TB');
    expect(LevelService.getItemDetails('TB', 0).labels[0].value).toEqual('test');
  }));

  /**
   *
   */
  it('should change element (point) details on level based on name and id', inject(function (LevelService) {
    // test on msajc003_bndl.annotation
    LevelService.setData(msajc003_bndl.annotation);
    LevelService.setPointDetails('Tone', 181, 'test', 100);
    expect(LevelService.getItemDetails('Tone', 0).id).toEqual(181);
    expect(LevelService.getItemDetails('Tone', 0).samplePoint).toEqual(100);
    expect(LevelService.getItemDetails('Tone', 0).labels[0].name).toEqual('Tone');
    expect(LevelService.getItemDetails('Tone', 0).labels[0].value).toEqual('test');
  }));

  /**
   *
   */
  it('should get element neightbour details', inject(function (LevelService) {
    // test on JDR10_bndl.annotation
    // should return neighbours "O" and "I"
    LevelService.setData(JDR10_bndl.annotation);
    var neigh = LevelService.getItemNeighboursFromLevel('Phonetic', 0, 1);
    expect(neigh.left.id).toEqual(3);
    expect(neigh.right.id).toEqual(4);
    item = getItemFromJSON(JDR10_bndl.annotation, 3);
    expect(neigh.left.labels).toEqual(item.labels);
    item = getItemFromJSON(JDR10_bndl.annotation, 4);
    expect(neigh.right.labels).toEqual(item.labels);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    // should return neighbours undefined and "lower"
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    var neigh = LevelService.getItemNeighboursFromLevel('TB', 40, 40);
    expect(neigh.left).toEqual(undefined);
    expect(neigh.right.id).toEqual(41);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 41);
    expect(neigh.right.labels).toEqual(item.labels);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    // should return neighbours "raise" and undefined
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    var neigh = LevelService.getItemNeighboursFromLevel('TB', 41, 41);
    expect(neigh.left.id).toEqual(40);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 40);
    expect(neigh.left.labels).toEqual(item.labels);
    expect(neigh.right).toEqual(undefined);

    // test on msajc003_bndl.annotation
    // should return neighbours "V" and "l"
    LevelService.setData(msajc003_bndl.annotation);
    var neigh = LevelService.getItemNeighboursFromLevel('Phonetic', 148, 179);
    expect(neigh.left.id).toEqual(147);
    item = getItemFromJSON(msajc003_bndl.annotation, 147);
    expect(neigh.left.labels).toEqual(item.labels);
    expect(neigh.right.id).toEqual(180);
    item = getItemFromJSON(msajc003_bndl.annotation, 180);
    expect(neigh.right.labels).toEqual(item.labels);

    // test on msajc003_bndl.annotation
    // should return neighbours undefined and undefined
    LevelService.setData(msajc003_bndl.annotation);
    var neigh = LevelService.getItemNeighboursFromLevel('Phonetic', 147, 180);
    expect(neigh.left).toEqual(undefined);
    expect(neigh.right).toEqual(undefined);
  }));

  /**
   *
   */
  it('should getClosestItem (surrounding details) for a given sampleNr', inject(function (LevelService) {
    // test on msajc003_bndl.annotation
    LevelService.setData(msajc003_bndl.annotation);
    // Soundhandlerservice.wavJSO.Data.length = 58089 
    // before any element isFirst should be true
    expect(LevelService.getClosestItem(10, 'Phonetic', 58089).isFirst).toEqual(true);
    // after any element isLast should be true
    expect(LevelService.getClosestItem(58088, 'Phonetic', 58089).isLast).toEqual(true);
    // in the middle nearest should be element
    // nearest left
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getClosestItem(20650, 'Phonetic', 58089).nearest.sampleStart).toEqual(item.sampleStart);
    // in the middle isFirst && isLast should be false
    expect(LevelService.getClosestItem(20650, 'Phonetic', 58089).isFirst).toEqual(false);
    expect(LevelService.getClosestItem(20650, 'Phonetic', 58089).isLast).toEqual(false);
    // nearest right
    item = getItemFromJSON(msajc003_bndl.annotation, 159);
    expect(LevelService.getClosestItem(23900, 'Phonetic', 58089).nearest.sampleStart).toEqual(item.sampleStart);
    // current should be actual element
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getClosestItem(20650, 'Phonetic', 58089).current.sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getClosestItem(23900, 'Phonetic', 58089).current.sampleStart).toEqual(item.sampleStart);
    // before first -> current should be first element
    item = getItemFromJSON(msajc003_bndl.annotation, 147);
    expect(LevelService.getClosestItem(10, 'Phonetic', 58089).current.sampleStart).toEqual(item.sampleStart);
    // after last -> current should be first element
    item = getItemFromJSON(msajc003_bndl.annotation, 180);
    expect(LevelService.getClosestItem(58088, 'Phonetic', 58089).current.sampleStart).toEqual(item.sampleStart);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    // Soundhandlerservice.wavJSO.Data.length = 96002  
    // before any element isFirst should be true
    expect(LevelService.getClosestItem(10, 'TT', 96002).isFirst).toEqual(true);
    // after any element isLast should be true
    expect(LevelService.getClosestItem(96000, 'TT', 96002).isLast).toEqual(true);
    // in the middle nearest should be element
    // nearest left
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 38);
    expect(LevelService.getClosestItem(30980, 'TT', 96002).nearest.sampleStart).toEqual(item.sampleStart);
    // in the middle isFirst && isLast should be false
    expect(LevelService.getClosestItem(30980, 'TT', 96002).isFirst).toEqual(false);
    expect(LevelService.getClosestItem(30980, 'TT', 96002).isLast).toEqual(false);
    // nearest right
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 39);
    expect(LevelService.getClosestItem(32700, 'TT', 96002).nearest.sampleStart).toEqual(item.sampleStart);
    // current should be actual element
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 38);
    expect(LevelService.getClosestItem(30980, 'TT', 96002).current.sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getClosestItem(32700, 'TT', 96002).current.sampleStart).toEqual(item.sampleStart);
    // before first -> current should be first element
    expect(LevelService.getClosestItem(10, 'TT', 96002).current.sampleStart).toEqual(item.sampleStart);
    // after last -> current should be first element
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 39);
    expect(LevelService.getClosestItem(96000, 'TT', 96002).current.sampleStart).toEqual(item.sampleStart);

    //test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    // Soundhandlerservice.wavJSO.Data.length = 112000 
    // before any element isFirst should be true
    expect(LevelService.getClosestItem(10, 'Phonetic', 112000).isFirst).toEqual(true);
    // after any element isLast should be true
    expect(LevelService.getClosestItem(111998, 'Phonetic', 112000).isLast).toEqual(true);
    // in the middle nearest should be element
    // nearest left
    item = getItemFromJSON(JDR10_bndl.annotation, 3);
    expect(LevelService.getClosestItem(87720, 'Phonetic', 112000).nearest.sampleStart).toEqual(item.sampleStart);
    // nearest right
    item = getItemFromJSON(JDR10_bndl.annotation, 0);
    expect(LevelService.getClosestItem(88630, 'Phonetic', 112000).nearest.sampleStart).toEqual(item.sampleStart);
    // current should be actual element
    // in the middle isFirst && isLast should be false
    expect(LevelService.getClosestItem(88630, 'Phonetic', 112000).isFirst).toEqual(false);
    expect(LevelService.getClosestItem(88630, 'Phonetic', 112000).isLast).toEqual(false);
    item = getItemFromJSON(JDR10_bndl.annotation, 3);
    expect(LevelService.getClosestItem(87720, 'Phonetic', 112000).current.sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getClosestItem(88630, 'Phonetic', 112000).current.sampleStart).toEqual(item.sampleStart);
    // before first -> current should be first element
    expect(LevelService.getClosestItem(10, 'Phonetic', 112000).current.sampleStart).toEqual(item.sampleStart);
    // after last -> current should be first element
    item = getItemFromJSON(JDR10_bndl.annotation, 4);
    expect(LevelService.getClosestItem(111998, 'Phonetic', 112000).current.sampleStart).toEqual(item.sampleStart);
  }));

  /**
   *
   */
  it('should delete a level', inject(function (LevelService, ConfigProviderService) {
    // test on msajc003_bndl.annotation
    ConfigProviderService.setVals(defaultEmuwebappConfig);
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.data.levels.length).toEqual(9);
    LevelService.deleteLevel(0, 0);
    expect(LevelService.data.levels.length).toEqual(8);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.data.levels.length).toEqual(4);
    LevelService.deleteLevel(2, 0);
    expect(LevelService.data.levels.length).toEqual(3);

    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.data.levels.length).toEqual(2);
    LevelService.deleteLevel(1, 0);
    expect(LevelService.data.levels.length).toEqual(1);
  }));

  /**
   *
   */
  it('should add a level', inject(function (LevelService, ConfigProviderService) {
    // test on msajc003_bndl.annotation
    ConfigProviderService.setVals(defaultEmuwebappConfig);
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.data.levels.length).toEqual(9);
    LevelService.addLevel({
      "items": [{
        "id": 150,
        "sampleStart": 0,
        "sampleDur": 90932,
        "labels": [{
          "name": "levelNr0",
          "value": ""
        }]
      }],
      "name": "levelNr0",
      "type": "SEGMENT"
    }, 0, 0);
    expect(LevelService.data.levels.length).toEqual(10);
    expect(LevelService.data.levels[0].items[0].id).toEqual(150);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.data.levels.length).toEqual(4);
    LevelService.addLevel({
      "items": [{
        "id": 151,
        "sampleStart": 0,
        "sampleDur": 90932,
        "labels": [{
          "name": "levelNr0",
          "value": ""
        }]
      }],
      "name": "levelNr0",
      "type": "SEGMENT"
    }, 2, 0);
    expect(LevelService.data.levels.length).toEqual(5);
    expect(LevelService.data.levels[2].items[0].id).toEqual(151);

    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.data.levels.length).toEqual(2);
    LevelService.addLevel({
      "items": [{
        "id": 152,
        "sampleStart": 0,
        "sampleDur": 90932,
        "labels": [{
          "name": "levelNr0",
          "value": ""
        }]
      }],
      "name": "levelNr0",
      "type": "SEGMENT"
    }, 1, 0);
    expect(LevelService.data.levels.length).toEqual(3);
    expect(LevelService.data.levels[1].items[0].id).toEqual(152);
  }));

  /**
   *
   */
  it('should rename an element', inject(function (LevelService, viewState) {

    // test on msajc003_bndl.annotation
    viewState.setCurLevelAttrDefs(aeDbConfig.levelDefinitions);
    LevelService.setData(msajc003_bndl.annotation);
    LevelService.renameLabel('Phonetic', 147, 0, 'test');
    expect(LevelService.getItemFromLevelById('Phonetic', 147).labels[0].value).toEqual('test');

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    viewState.setCurLevelAttrDefs(emaDbConfig.levelDefinitions);
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    LevelService.renameLabel('TB', 40, 0, 'test');
    expect(LevelService.getItemFromLevelById('TB', 40).labels[0].value).toEqual('test');

    // test on JDR10_bndl.annotation
    viewState.setCurLevelAttrDefs(epgdorsalDbConfig.levelDefinitions);
    LevelService.setData(JDR10_bndl.annotation);
    LevelService.renameLabel('Phonetic', 3, 0, 'test');
    expect(LevelService.getItemFromLevelById('Phonetic', 3).labels[0].value).toEqual('test');
  }));

  /**
   *
   */
  it('should rename a level', inject(function (LevelService, ConfigProviderService) {
    // test on msajc003_bndl.annotation
    LevelService.setData(msajc003_bndl.annotation);
    ConfigProviderService.setVals(defaultEmuwebappConfig);
    expect(LevelService.getLevelDetails('Phonetic').id).toEqual(6);
    LevelService.renameLevel('Phonetic', 'test', 0);
    expect(LevelService.getLevelDetails('test').id).toEqual(6);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getLevelDetails('TB').id).toEqual(3);
    LevelService.renameLevel('TB', 'test', 0);
    expect(LevelService.getLevelDetails('test').id).toEqual(3);

    // test on JDR10_bndl.annotation
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').id).toEqual(1);
    LevelService.renameLevel('Phonetic', 'test', 0);
    expect(LevelService.getLevelDetails('test').id).toEqual(1);
  }));

  /**
   *
   */
  it('should deleteSegments', inject(function (LevelService) {
    // test on msajc003_bndl.annotation
    // 2 elements in the middle
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    LevelService.deleteSegments('Phonetic', 148, 2);
    // check new length 34-2=32
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(32);
    // check new sampleDur of 147
    var timeLeft = getItemFromJSON(msajc003_bndl.annotation, 148).sampleDur+1
                   +getItemFromJSON(msajc003_bndl.annotation, 149).sampleDur+1;
    var timeRight = 0;
    if (timeLeft % 2 == 0) {
        timeLeft = timeLeft / 2;
		timeRight = timeLeft;
    }
    else {
		timeLeft = Math.ceil(timeLeft / 2);
		timeRight = timeLeft - 1;    
    }
    var newSampleDur = getItemFromJSON(msajc003_bndl.annotation, 147).sampleDur + timeLeft;
    expect(LevelService.getItemFromLevelById('Phonetic', 147).sampleDur).toEqual(1389 + timeLeft);
    // check new sampleDur and sampleStart of 150
    // to be length of 150 + (148+149)/2  
    expect(LevelService.getItemFromLevelById('Phonetic', 150).sampleDur).toEqual(1134 + timeRight);
    // and to be at position
    expect(LevelService.getItemFromLevelById('Phonetic', 150).sampleStart).toEqual(8535 - timeRight);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    // 1 elements on left side
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
    LevelService.deleteSegments('TB', 40, 1);
    // check new length 2-1=1  
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(1);
    timeLeft = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 40).sampleDur+1;
    timeRight = 0;
    if (timeLeft % 2 == 0) {
        timeLeft = timeLeft / 2;
		timeRight = timeLeft;
    }
    else {
		timeLeft = Math.ceil(timeLeft / 2);
		timeRight = timeLeft - 1;    
    }
    // check new sampleDur  
    newSampleDur = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 41).sampleDur + timeRight;   
    expect(LevelService.getItemFromLevelById('TB', 41).sampleDur).toEqual(newSampleDur);

    // test on JDR10_bndl.annotation
    // 1 elements on right side
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
    LevelService.deleteSegments('Phonetic', 4, 1);
    // check new length 4-1=3  
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(3);
    timeLeft = getItemFromJSON(JDR10_bndl.annotation, 4).sampleDur+1;
    timeRight = 0;
    if (timeLeft % 2 == 0) {
        timeLeft = timeLeft / 2;
		timeRight = timeLeft;
    }
    else {
		timeLeft = Math.ceil(timeLeft / 2);
		timeRight = timeLeft - 1;    
    }    
    // check new sampleDur and sampleStart   
    newSampleDur = getItemFromJSON(JDR10_bndl.annotation, 1).sampleDur + timeRight;
    expect(LevelService.getItemFromLevelById('Phonetic', 1).sampleDur).toEqual(newSampleDur);
  }));

  /**
   *
   */
  it('should deleteSegmentsInvers', inject(function (LevelService, viewState) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    viewState.setCurLevelAttrDefs(aeDbConfig.levelDefinitions)
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    var deleted = LevelService.deleteSegments('Phonetic', 148, 2);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(32);
    LevelService.deleteSegmentsInvers('Phonetic', 148, 2, deleted);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    item = getItemFromJSON(msajc003_bndl.annotation, 148);
    expect(LevelService.getItemFromLevelById('Phonetic', 148).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('Phonetic', 148).sampleStart).toEqual(item.sampleStart);
    item = getItemFromJSON(msajc003_bndl.annotation, 149);
    expect(LevelService.getItemFromLevelById('Phonetic', 149).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('Phonetic', 149).sampleStart).toEqual(item.sampleStart);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    // 1 elements on left side
    viewState.setCurLevelAttrDefs(emaDbConfig.levelDefinitions)
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
    var deleted = LevelService.deleteSegments('TB', 41, 1);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(1);
    LevelService.deleteSegmentsInvers('TB', 41, 1, deleted);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 41);
    expect(LevelService.getItemFromLevelById('TB', 41).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('TB', 41).sampleStart).toEqual(item.sampleStart);
    

    // test on JDR10_bndl.annotation
    // 1 elements on right side
    viewState.setCurLevelAttrDefs(epgdorsalDbConfig.levelDefinitions)
    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
    var deleted = LevelService.deleteSegments('Phonetic', 4, 1);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(3);
    LevelService.deleteSegmentsInvers('Phonetic', 4, 1, deleted);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
    item = getItemFromJSON(JDR10_bndl.annotation, 4);
    expect(LevelService.getItemFromLevelById('Phonetic', 4).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('Phonetic', 4).sampleStart).toEqual(item.sampleStart);
    
  }));

  /**
   *
   */
  it('should insertSegment', inject(function (LevelService, viewState, ConfigProviderService) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    ConfigProviderService.curDbConfig = aeDbConfig;
    viewState.setCurLevelAttrDefs(aeDbConfig.levelDefinitions);
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    // insert 1 new segment on the left side
    var ret1 = LevelService.insertSegment('Phonetic', 100, 100, 'test1');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(35);
    // insert 2 new segments on the left side
    var ret2 = LevelService.insertSegment('Phonetic', 10, 50, 'test2');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(37);
    expect(LevelService.getItemFromLevelById('Phonetic', ret1.ids[0]).labels[0].value).toEqual('test1');
    expect(LevelService.getItemFromLevelById('Phonetic', ret2.ids[0]).labels[0].value).toEqual('test2');
    expect(LevelService.getItemFromLevelById('Phonetic', ret2.ids[1]).labels[0].value).toEqual('test2');

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    ConfigProviderService.curDbConfig = emaDbConfig;
    viewState.setCurLevelAttrDefs(emaDbConfig.levelDefinitions);

    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
    // insert 1 new segment on the right side    
    var ret1 = LevelService.insertSegment('TB', 58000, 58000, 'test1');
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(3);
    // insert 2 new segments on the left side
    var ret2 = LevelService.insertSegment('TB', 58100, 58200, 'test2');
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(5);
    expect(LevelService.getItemFromLevelById('TB', ret1.ids[0]).labels[0].value).toEqual('test1');
    expect(LevelService.getItemFromLevelById('TB', ret2.ids[0]).labels[0].value).toEqual('test2');
    expect(LevelService.getItemFromLevelById('TB', ret2.ids[1]).labels[0].value).toEqual('test2');

    // test on JDR10_bndl.annotation
    ConfigProviderService.curDbConfig = epgdorsalDbConfig;
    viewState.setCurLevelAttrDefs(epgdorsalDbConfig.levelDefinitions);

    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
    // insert 1 new segment in the middle   
    var ret1 = LevelService.insertSegment('Phonetic', 90000, 90000, 'test1');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(5);
    // insert 2 new segments in the middle
    var ret2 = LevelService.insertSegment('Phonetic', 89000, 89500, 'test2');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(7);
    expect(LevelService.getItemFromLevelById('Phonetic', ret1.ids[0]).labels[0].value).toEqual('test1');
    expect(LevelService.getItemFromLevelById('Phonetic', ret2.ids[0]).labels[0].value).toEqual('test2');
    expect(LevelService.getItemFromLevelById('Phonetic', ret2.ids[1]).labels[0].value).toEqual('test2');
  }));

  /**
   *
   */
  it('should insertSegmentInvers', inject(function (LevelService, viewState, ConfigProviderService) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    ConfigProviderService.curDbConfig = aeDbConfig;
    viewState.setCurLevelAttrDefs(aeDbConfig.levelDefinitions);

    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    // insert 1 new segment on the left side
    LevelService.insertSegment('Phonetic', 100, 100, 'test1');
    LevelService.insertSegmentInvers('Phonetic', 100, 100, 'test1');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    // insert 2 new segments on the left side
    LevelService.insertSegment('Phonetic', 10, 50, 'test2');
    LevelService.insertSegmentInvers('Phonetic', 10, 50, 'test2');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    ConfigProviderService.curDbConfig = emaDbConfig;
    viewState.setCurLevelAttrDefs(emaDbConfig.levelDefinitions);

    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
    // insert 1 new segment on the right side    
    LevelService.insertSegment('TB', 58000, 58000, 'test1');
    LevelService.insertSegmentInvers('TB', 58000, 58000, 'test1');
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);
    // insert 2 new segments on the left side
    LevelService.insertSegment('TB', 58100, 58200, 'test2');
    LevelService.insertSegmentInvers('TB', 58100, 58200, 'test2');
    expect(LevelService.getLevelDetails('TB').level.items.length).toEqual(2);

    // test on JDR10_bndl.annotation
    ConfigProviderService.curDbConfig = epgdorsalDbConfig;
    viewState.setCurLevelAttrDefs(epgdorsalDbConfig.levelDefinitions);

    LevelService.setData(JDR10_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
    // insert 1 new segment in the middle   
    LevelService.insertSegment('Phonetic', 90000, 90000, 'test1');
    LevelService.insertSegmentInvers('Phonetic', 90000, 90000, 'test1');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
    // insert 2 new segments in the middle
    LevelService.insertSegment('Phonetic', 89000, 89500, 'test2');
    LevelService.insertSegmentInvers('Phonetic', 89000, 89500, 'test2');
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(4);
  }));

  /**
   *
   */
  it('should insertPoint', inject(function (LevelService, viewState, ConfigProviderService) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    ConfigProviderService.curDbConfig = aeDbConfig;
    viewState.setCurLevelAttrDefs(aeDbConfig.levelDefinitions);

    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Tone').level.items.length).toEqual(7);
    // insert 1 new point
    var ret = LevelService.insertPoint('Tone', 100, 'test');
    expect(LevelService.getLevelDetails('Tone').level.items.length).toEqual(8);
    expect(LevelService.getItemFromLevelById('Tone', ret.id).labels[0].value).toEqual('test');
  }));

  /**
   *
   */
  it('should deletePoint', inject(function (LevelService) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Tone').level.items.length).toEqual(7);
    // delete 1 point
    var ret = LevelService.deletePoint('Tone', 181);
    expect(LevelService.getLevelDetails('Tone').level.items.length).toEqual(6);
  }));

  /**
   *
   */
  it('should deleteBoundary', inject(function (LevelService) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    // delete 1 boundary
    var ret = LevelService.deleteBoundary('Phonetic', 148);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(33);
    item = getItemFromJSON(msajc003_bndl.annotation, 147);
    var testText = item.labels[0].value;
    var testLength = item.sampleDur;
    item = getItemFromJSON(msajc003_bndl.annotation, 148);
    testText += item.labels[0].value;
    testLength += item.sampleDur;
    expect(LevelService.getItemFromLevelById('Phonetic', 147).labels[0].value).toEqual(testText);
    expect(LevelService.getItemFromLevelById('Phonetic', 147).sampleDur).toEqual(testLength + 1);
  }));

  /**
   *
   */
  it('should deleteBoundaryInvers', inject(function (LevelService) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    LevelService.setData(msajc003_bndl.annotation);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    // delete 1 boundary
    var ret = LevelService.deleteBoundary('Phonetic', 148 , false, false);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(33);
    // undo delete 1 boundary
    LevelService.deleteBoundaryInvers('Phonetic', 148, false, false, ret);
    expect(LevelService.getLevelDetails('Phonetic').level.items.length).toEqual(34);
    item = getItemFromJSON(msajc003_bndl.annotation, 147);
    expect(LevelService.getItemFromLevelById('Phonetic', 147).labels).toEqual(item.labels);
    expect(LevelService.getItemFromLevelById('Phonetic', 147).sampleDur).toEqual(item.sampleDur);
  }));

  /**
   *
   */
  it('should snapBoundary', inject(function (LevelService, Soundhandlerservice) {
    // test on msajc003_bndl.annotation
    // snap Boundary
    LevelService.setData(msajc003_bndl.annotation);
    Soundhandlerservice.wavJSO.Data = new Array(58089);
    // snap point to boundary above
    var ret = LevelService.snapBoundary(true,
      'Tone', {
        "id": 181,
        "samplePoint": 8382,
        "labels": [{
          "name": "Tone",
          "value": "H*"
        }]
      }, {
        "right": {
          "id": 182,
          "samplePoint": 18632,
          "labels": [{
            "name": "Tone",
            "value": "H*"
          }]
        }
      },
      'EVENT');
    expect(ret).toEqual(153);
  }));


  /**
   *
   */
  it('should moveBoundary', inject(function (LevelService, Soundhandlerservice) {

    // test on msajc003_bndl.annotation
    // move Boundary
    LevelService.setData(msajc003_bndl.annotation);
    // move middle (0) boundary of segment with id 158 on level 'Phonetic' by 100000 samples -> should not change anything
    LevelService.moveBoundary('Phonetic', 158, 100000, false, false);
    item = getItemFromJSON(msajc003_bndl.annotation, 157);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(item.sampleDur);
    // move middle (0) boundary of segment with id 158 on level 'Phonetic' by 10 samples
    LevelService.moveBoundary('Phonetic', 158, 10, false, false);
    item = getItemFromJSON(msajc003_bndl.annotation, 157);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur + 10);
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(item.sampleDur - 10);
    // move left most (-1) boundary of segment with id 147 on level 'Phonetic' by 10 samples   
    LevelService.moveBoundary('Phonetic', 147, 10, true, false);
    item = getItemFromJSON(msajc003_bndl.annotation, 147);
    expect(LevelService.getItemFromLevelById('Phonetic', 147).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 147).sampleDur).toEqual(item.sampleDur - 10);
    // move right most (1) boundary of segment with id 180 on level 'Phonetic' by 10 samples 
    Soundhandlerservice.wavJSO.Data = new Array(58089);
    LevelService.moveBoundary('Phonetic', 180, 10, false, true);
    item = getItemFromJSON(msajc003_bndl.annotation, 180);
    expect(LevelService.getItemFromLevelById('Phonetic', 180).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 180).sampleDur).toEqual(item.sampleDur + 10);

    // test on dfgspp_mo1_prosody_0024_bndl.annotation
    // move Boundary
    LevelService.setData(dfgspp_mo1_prosody_0024_bndl.annotation);
    // move middle (0) boundary of segment with id 2 on level 'Segment' by 100000 samples -> should not change anything
    LevelService.moveBoundary('Segment', 2, 100000, false, false);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 1);
    expect(LevelService.getItemFromLevelById('Segment', 1).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Segment', 1).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 2);
    expect(LevelService.getItemFromLevelById('Segment', 2).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Segment', 2).sampleDur).toEqual(item.sampleDur);
    // move middle (0) boundary of segment with id 2 on level 'Segment' by 10 samples
    LevelService.moveBoundary('Segment', 2, 10, false, false);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 1);
    expect(LevelService.getItemFromLevelById('Segment', 1).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Segment', 1).sampleDur).toEqual(item.sampleDur + 10);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 2);
    expect(LevelService.getItemFromLevelById('Segment', 2).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Segment', 2).sampleDur).toEqual(item.sampleDur - 10);
    // move left most (-1) boundary of segment with id 0 on level 'Segment' by 10 samples   
    LevelService.moveBoundary('Segment', 0, 10, true, false);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 0);
    expect(LevelService.getItemFromLevelById('Segment', 0).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Segment', 0).sampleDur).toEqual(item.sampleDur - 10);
    // move right most (1) boundary of segment with id 180 on level 'Phonetic' by 10 samples 
    Soundhandlerservice.wavJSO.Data = new Array(96002);
    LevelService.moveBoundary('Segment', 37, 10, false, true);
    item = getItemFromJSON(dfgspp_mo1_prosody_0024_bndl.annotation, 37);
    expect(LevelService.getItemFromLevelById('Segment', 37).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Segment', 37).sampleDur).toEqual(item.sampleDur + 10);

    // test on JDR10_bndl.annotation
    // move Boundary
    LevelService.setData(JDR10_bndl.annotation);
    // move middle (0) boundary of segment with id 1 on level 'Phonetic' by 100000 samples -> should not change anything
    LevelService.moveBoundary('Phonetic', 1, 100000, false, false);
    item = getItemFromJSON(JDR10_bndl.annotation, 0);
    expect(LevelService.getItemFromLevelById('Phonetic', 0).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 0).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(JDR10_bndl.annotation, 1);
    expect(LevelService.getItemFromLevelById('Phonetic', 1).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 1).sampleDur).toEqual(item.sampleDur);
    // move middle (0) boundary of segment with id 1 on level 'Phonetic' by 10 samples
    LevelService.moveBoundary('Phonetic', 1, 10, false, false);
    item = getItemFromJSON(JDR10_bndl.annotation, 0);
    expect(LevelService.getItemFromLevelById('Phonetic', 0).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 0).sampleDur).toEqual(item.sampleDur + 10);
    item = getItemFromJSON(JDR10_bndl.annotation, 1);
    expect(LevelService.getItemFromLevelById('Phonetic', 1).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 1).sampleDur).toEqual(item.sampleDur - 10);
    // move left most (-1) boundary of segment with id 0 on level 'Phonetic' by 10 samples   
    LevelService.moveBoundary('Phonetic', 3, 10, true, false);
    item = getItemFromJSON(JDR10_bndl.annotation, 3);
    expect(LevelService.getItemFromLevelById('Phonetic', 3).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 3).sampleDur).toEqual(item.sampleDur - 10);
    // move right most (1) boundary of segment with id 180 on level 'Phonetic' by 10 samples 
    Soundhandlerservice.wavJSO.Data = new Array(112000);
    LevelService.moveBoundary('Phonetic', 4, 10, false, true);
    item = getItemFromJSON(JDR10_bndl.annotation, 4);
    expect(LevelService.getItemFromLevelById('Phonetic', 4).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 4).sampleDur).toEqual(item.sampleDur + 10);
  }));


  /**
   *
   */
  it('should movePoint', inject(function (LevelService, Soundhandlerservice) {
    // test on msajc003_bndl.annotation
    // delete and deleteSegmentsInvers 2 segments
    LevelService.setData(msajc003_bndl.annotation);
    Soundhandlerservice.wavJSO.Data = new Array(58089);
    // move point with id 181 on level 'Tone' by 100000000000 samples -> should not change anything
    LevelService.movePoint('Tone', 181, 100000000000);
    item = getItemFromJSON(msajc003_bndl.annotation, 181);
    expect(LevelService.getItemFromLevelById('Tone', 181).samplePoint).toEqual(item.samplePoint);
    // move point with id 181 on level 'Tone' by 10 samples
    LevelService.movePoint('Tone', 181, 10);
    expect(LevelService.getItemFromLevelById('Tone', 181).samplePoint).toEqual(item.samplePoint + 10);
    // move point with id 181 on level 'Tone' back by 10 samples
    LevelService.movePoint('Tone', 181, -10);
    expect(LevelService.getItemFromLevelById('Tone', 181).samplePoint).toEqual(item.samplePoint);
  }));


  /**
   *
   */
  it('should moveSegment', inject(function (LevelService, Soundhandlerservice) {
    // test on msajc003_bndl.annotation
    // move segment
    LevelService.setData(msajc003_bndl.annotation);
    Soundhandlerservice.wavJSO.Data = new Array(58089);
    // move single segment with id 158 on level 'Phonetic' by 100000000000 samples -> should not change anything
    LevelService.moveSegment('Phonetic', 158, 1, 100000000000);
    item = getItemFromJSON(msajc003_bndl.annotation, 157);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 159);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleDur).toEqual(item.sampleDur);
    // move single segment with id 158 on level 'Phonetic' by 10 samples
    LevelService.moveSegment('Phonetic', 158, 1, 10);
    item = getItemFromJSON(msajc003_bndl.annotation, 157);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur + 10);
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 159);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleDur).toEqual(item.sampleDur - 10);
    // undo made changes
    LevelService.moveSegment('Phonetic', 158, 1, -10);
    // move two segments beginning with id 158 on level 'Phonetic' by 10 samples
    LevelService.moveSegment('Phonetic', 158, 2, 10);
    item = getItemFromJSON(msajc003_bndl.annotation, 157);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur + 10);
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 159);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleDur).toEqual(item.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 160);
    expect(LevelService.getItemFromLevelById('Phonetic', 160).sampleStart).toEqual(item.sampleStart + 10);
    expect(LevelService.getItemFromLevelById('Phonetic', 160).sampleDur).toEqual(item.sampleDur - 10);
  }));



  /**
   *
   */
  it('should expandSegment', inject(function (LevelService) {
    
    // test on msajc003_bndl.annotation
    // expand segment
    LevelService.setData(msajc003_bndl.annotation);
    var temp = getItemFromJSON(msajc003_bndl.annotation, 158);
    // expand segment with id 158 on level 'Phonetic' on RIGHT side
    LevelService.expandSegment(true, [temp], 'Phonetic', 750);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(temp.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(temp.sampleDur + 750);
    item = getItemFromJSON(msajc003_bndl.annotation, 159);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleStart).toEqual(item.sampleStart + 750);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleDur).toEqual(item.sampleDur - 750);

    // shrink segment with id 158 on level 'Phonetic' on RIGHT side
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    LevelService.expandSegment(true, [temp],'Phonetic', -750);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(temp.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(temp.sampleDur);
    item = getItemFromJSON(msajc003_bndl.annotation, 159);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 159).sampleDur).toEqual(item.sampleDur);

    // expand segment with id 158 on level 'Phonetic' on LEFT side
    item = getItemFromJSON(msajc003_bndl.annotation, 158);
    LevelService.expandSegment(false, [temp],'Phonetic', 750);
    item = getItemFromJSON(msajc003_bndl.annotation, 157);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur - 750);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(temp.sampleStart - 750);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(temp.sampleDur + 750);

    // shrink segment with id 158 on level 'Phonetic' on LEFT side
    LevelService.expandSegment(false, [temp],'Phonetic', -750);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleStart).toEqual(item.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 157).sampleDur).toEqual(item.sampleDur);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleStart).toEqual(temp.sampleStart);
    expect(LevelService.getItemFromLevelById('Phonetic', 158).sampleDur).toEqual(temp.sampleDur);

  }));

  // calcDistanceToNearestZeroCrossing
  // TODO openEditArea && deleteEditArea && createSelection && createEditArea 
  // --> maybe move to directive in order to make it testable   

  /**
   *
   */
  it('should get all labels of level', inject(function (LevelService, viewState) {
    // set according data
    LevelService.setData(msajc003_bndl.annotation);
    viewState.setCurLevelAttrDefs(aeDbConfig.levelDefinitions);
    var levelDetails = LevelService.getLevelDetails('Phonetic');

    // console.log(levelDetails.level);
    var labels = LevelService.getAllLabelsOfLevel(levelDetails);
    expect(labels.length).toEqual(34);
    expect(labels[0]).toEqual('V');
    expect(labels[8]).toEqual('f');
    expect(labels[labels.length - 1]).toEqual('l');
  }));

  /**
   *
   */
  it('should add links to parent', inject(function (LevelService) {
    // set according data
    LevelService.setData(msajc003_bndl.annotation);
    LevelService.data.links = [];
    var parentID = 1234;
    var childIDs = [1, 2, 3, 4];
    LevelService.addLinkToParent(parentID, childIDs);
    expect(LevelService.data.links.length).toEqual(4);
    expect(LevelService.data.links[0].fromID).toEqual(1234);
    expect(LevelService.data.links[0].toID).toEqual(1);
  }));

  /**
   *
   */
  it('should remove links to parent', inject(function (LevelService) {
    // first add
    LevelService.setData(msajc003_bndl.annotation);
    LevelService.data.links = [];
    var parentID = 1234;
    var childIDs = [1, 2, 3, 4];
    LevelService.addLinkToParent(parentID, childIDs);
    // then remove
    LevelService.inverseAddLinkToParent(parentID, childIDs);
    expect(LevelService.data.links.length).toEqual(0);
  }));
  
});