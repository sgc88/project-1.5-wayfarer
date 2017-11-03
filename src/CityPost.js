import react from 'react';
import City from 'City'

let images = [
  {
    key:1,
    images:['../src/images/london.jpg', '../src/images/Taipei.jpg', '../src/images/new-york-city.jpg', '../src/images/vancouver.jpg','../src/images/fujian.jpg']
  }
]



class city extends React.Component {
  render() {
    return (
      <div>
        {images.map((img, i)=>(
          <div key={i}>
            {img.images.map((image,index)=>(
              <CityItem imageUrl={image} key={index} />
            ))}
          </div>
        ))}
        ))
      </div>
    )
  }
}

class CityItem extends React.Component {
  render() {

    return (
      <div>
        <img src={this.props.imageUrl} />
      </div>
    )
  }
}

ReactDOM.render(<city />,document.getElementById("cityImage"))



// export { images };
// export default postImage;
