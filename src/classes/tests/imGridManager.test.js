import {ImageGridManager} from "../imGridManager"
var assert = require('chai').assert;
import _ from "lodash";


describe('image Grid manager tests', function() {

    describe('constructor tests', function() {

        it('fail on pass nothing', function() {
            assert.throws(()=>{
                const m = new ImageGridManager();
            }, 
            Error, "Constructor Error on no data url or data pairs passed in")
            
        });
        it('basic construct', function() {
            const data_pairs = [ {ImageKey:  4, ObjectKey: 5}, {ImageKey: 2, ObjectKey: 8}]
            const dataurl1 = "https://i.postimg.cc/0yS7m2dV/AS-09125-050116000001-A01f00d2.png"
            const dataurl2 = "https://i.postimg.cc/0yS7m2dV/AS-09125-050116000001-A01f00d2.png"
            const dataurls = [dataurl1, dataurl2]
            const IGManager = new ImageGridManager(data_pairs, dataurls)
            assert.exists(IGManager)
        });
        it('fail constructor on mismatched data pair and dataurl length', function() {
            assert.throws(()=>{
                const data_pairs = [ {ImageKey:  4, ObjectKey: 5}, {ImageKey: 2, ObjectKey: 8}]
                const dataurl1 = "https://i.postimg.cc/0yS7m2dV/AS-09125-050116000001-A01f00d2.png"
                const dataurls = [dataurl1]
                const m = new ImageGridManager(data_pairs, dataurls)
              }, 
              Error, "Constructor Error on mismatched data pair and dataurl length")
        })
    });

    describe('usage tests', function() {

        it('API: gets number of images', function() {
            const data_pairs = [ {ImageKey:  4, ObjectKey: 5}, {ImageKey: 2, ObjectKey: 8}]
            const dataurl1 = "https://i.postimg.cc/0yS7m2dV/AS-09125-050116000001-A01f00d2.png"
            const dataurl2 = "https://i.postimg.cc/0yS7m2dV/AS-09125-050116000001-A01f00d2.png"
            const dataurls = [dataurl1, dataurl2]
            const IGManager = new ImageGridManager(data_pairs, dataurls)

            assert.strictEqual(IGManager.get_number_images(), 2)
        }); 

    });
});