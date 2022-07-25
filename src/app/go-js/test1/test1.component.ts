import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit, AfterViewInit {

  diagram: go.Diagram = {} as go.Diagram;
  model: go.TreeModel = {} as go.TreeModel;

  constructor() { }

  ngOnInit(): void {
    let tree = [
      { key: 1, name: 'جعفر', parent: '' },
      { key: 2, name: 'Luke Warm', parent: 1 },
      { key: 3, name: 'Meg Meehan Hoffa', parent: 1 },
      { key: 4, name: 'Peggy Flaming', parent: 2 },
      { key: 5, name: 'Saul Wellingood', parent: 2 },
      { key: 6, name: 'Al Ligori', parent: 3 },
      { key: 7, name: 'Dot Stubadd', parent: 3 },
      { key: 8, name: 'Les Ismore', parent: 4 },
      { key: 9, name: 'April Lynn Parris', parent: 4 },
      { key: 10, name: 'Xavier Breath', parent: 5 },
      { key: 11, name: 'Anita Hammer', parent: 5 },
      { key: 12, name: 'Billy Aiken', parent: 6 },
      { key: 13, name: 'Stan Wellback', parent: 6 },
      { key: 14, name: 'Marge Innovera', parent: 7 },
      { key: 15, name: 'Evan Elpus', parent: 7 },
      { key: 16, name: 'Lotta B. Essen', parent: 8 },
      { key: 17, name: 'Lotta B. Essen', parent: 8 }
    ]
    this.model= new go.TreeModel(
      tree
    );
  }

  public ngAfterViewInit() {
    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20
            }),
        'undoManager.isEnabled': true
      }
    );

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', function (sel) { return sel ? 'Foreground' : ''; }).ofObject(),
        // define the node's outer shape
        $(go.Shape, 'Rectangle',
          {
            name: 'SHAPE', fill: '#26995f', stroke: null,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
          },
          new go.Binding('fill', '', function (node) {
            // modify the fill based on the tree depth level
            const levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB',
              '#008299', '#D24726', '#008A00', '#094AB2'];
            let color = node.findObject('SHAPE').fill;
            const dia: go.Diagram = node.diagram;
            if (dia && dia.layout.network) {
              dia.layout.network.vertexes.each(
                () => function (v: go.TreeVertex) {
                  debugger;
                  if (v.node && v.node.key === node.data.key) {
                    const level: number = v.level % (levelColors.length);
                    color = levelColors[level];
                  }
                }
              );
            }
            return color;
          }).ofObject()
        ),
        $(go.Panel, 'Horizontal',
          $(go.Panel, 'Table',
            {
              maxSize: new go.Size(150, 999),
              margin: new go.Margin(6, 10, 0, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: '12pt Segoe UI,sans-serif',
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              },
              new go.Binding('text', 'name').makeTwoWay()),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the comments
              {
                row: 3, column: 0, columnSpan: 5,
                font: 'italic 9pt sans-serif',
                wrap: go.TextBlock.WrapFit,
                editable: true,  // by default newlines are allowed
                minSize: new go.Size(10, 14)
              },
              new go.Binding('text', 'comments').makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );
    // end Node

    this.diagram.model = this.model;

  }

}
