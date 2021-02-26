class NetworkInterface {
  constructor(method,params,url) {
    this.method = method || 'GET'
    this.params = params || {}
    this.url = url;
  }

  sendAjax() {
    if (!!this.url) {
      $.ajax({
        type:this.method,
        url:this.url,
        data:this.params,
        success:function (data) {
         console.log('success fethed data:', data)
        }
      })
    }
  }
}

module.exports = NetworkInterface;
