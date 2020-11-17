# ElementManager
JavaScript library to create and manage HTML elements and CSS styles

### Creating an empty element and add it to body
```javascript
createElement().addTo(document.body);
```

### Creating an simple CSS object

```javascript
let styles = createCSSObject({
  element: {
    width: '200px',
    height: '200px',
    backgroundColor: 'orange'
  }
});
```

### Setting element style
```javascript
let styles = createCSSObject({
  element: {
    width: '200px',
    height: '200px',
    backgroundColor: 'orange'
  }
});

createElement({
  style: styles.element
}).addTo(document.body);
```

## Setting element style manually
```javascript
createElement({
  style: {
    width: '200px',
    height: '200px',
    backgroundColor: 'orange'
  }
}).addTo(document.body);
```
