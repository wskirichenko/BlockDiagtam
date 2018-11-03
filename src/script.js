// window.onload = function () {
	function init() {
		// go.licenseKey = "S4ff40e6b21c28c702d95d76423d38f919a57563c8841da30a0717f6ef086c46729cb87154cl9bc7daa84efc492e928d88c56e299344073eb538d6d810e587fde23023b0175b419cb40573939ffa78flfd6a61flc3b57ebdd8678cf6";
			var $ = go.GraphObject.make;
			myDiagram = $ (go.Diagram, "myDiagramDiv",
				{	// расположение диограммы по центру формы
					initialContentAlignment: go.Spot.Center,
					"undoManager.isEnabled": true,  // Разрешить отнену действий пользователя
					// Направление построения диограммы  )
					layout: $(go.TreeLayout, 
						{ 
							angle: 0, 			// Вертникально - 90, 270; горизонтально - 0, 180
							layerSpacing: 150 	// Растояние между блоками (в px)
						}
					)
				}
			);

		// ----- Настройка блока текста -----  https://gojs.net/latest/api/symbols/TextBlock.html	
			myDiagram.nodeTemplate = 
				$(go.Node, "Auto", 	// Форма будет обходить TextBlock
					{
						fromSpot: go.Spot.RightSide, 	// линии выходят из правой стороны,
        				toSpot: go.Spot.LeftSide		// входят в левую сторону блока
					},    
					// Форма блока Rectangle / RoundedRectangle / Ellipse ...
					$(go.Shape, "Rectangle", { 			// https://gojs.net/latest/intro/shapes.html
						fill: "white" 		// Цвет залики блока, например "lightgray"
					}),
					$(go.TextBlock, { 
						margin: 10, 		// Отступ между текстом и границей блока
						stroke: "black",	// Цвет текста
						// Шаблон для шрифта  font: "font-style font-variant font-weight font-size font-family"
						font: "normal normal normal 20px Georgia, Serif" 
					},
						new go.Binding("text", "name")
					)
				); 

		// ----- Свяди между блоками -----  https://gojs.net/latest/intro/links.html
			myDiagram.linkTemplate =
				$(go.Link,
					{ // Формат связей go.Link.Orthogonal или go.Link.Normal
						routing: go.Link.Orthogonal, 
						routing: go.Link.AvoidsNodes,	// Оптекание линии вокруг блока
						corner: 0 	// Скругление линии при поворотах
					},
					$(go.Shape),  // форма ссылка 
					$(go.Shape,   // Стрелки 
						{ // Наконечник стрелки (например toArrow: "OpenTriangle")
							toArrow: "Standard" , 
							fill: "black" 	// fill: null (нет заливки)
						}
					),
					// Для надписей над линиями
					$(go.TextBlock, 		
						// { textAlign: "center" },  	// centered multi-line text
						{ segmentOffset: new go.Point(0, 30) }, // Смещение надписи относительно линии (y, x)
						new go.Binding("text", "text")
					)
				);
				
			myDiagram.model = 
				$(go.GraphLinksModel, {
					nodeDataArray: [
						{ key: "b1", name: "Первый блок"  }, 
						{ key: "b2", name: "Beta"	},
						{ key: "b3", name: "Delta"	}, 
						{ key: "b4", name: "Gamma" 	},
						{ key: "b5", name: "Новый блок" 	},
						{ key: "b6", name: "Последний блок" }
					]
				}, {
					linkDataArray : [
						{ from: "b1", to: "b2", text: "Это надпись\n над линией"},
						{ from: "b2", to: "b3" },
						{ from: "b1", to: "b4" },
						{ from: "b4", to: "b6", text: "Надпись" },
						{ from: "b4", to: "b5" } 
					]
				}
				);

	}
// }