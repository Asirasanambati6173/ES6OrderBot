const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    FRIES: Symbol("fries"),
    ITEMPRICE: Symbol("itemprice"),
    SIZEPRICE: Symbol("sizeprice"),
    TOTALPRICE: Symbol("totalprice"),
    TOPPINGSPRICE :Symbol("toppingsprice"),
    FRIESPRICE: Symbol("friesprice"),
    DRINKSPRICE: Symbol("drinksprice")
});

module.exports = class RestaurantOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sMenu = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sFries = "";
        this.sItem = "burger";
        this.sItemprice = "";
        this.sSizeprice = "";
        this.totalprice = "";
        this.sToppingsprice = "";
        this.sFriesprice = "";
        this.sDrinksprice = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                //this.orderItems.push(sInput)
                aReturn.push("Welcome to Anudeeps's Restaurant.");
                aReturn.push("What would you like to have?");
                aReturn.push("burger" + "=" + "$10");
                aReturn.push("garlic bread" + "=" + "$5");
                this.stateCur = OrderState.MENU;
                break;
            case OrderState.MENU:
                if (sInput == "burger"){
                    this.sItemprice = 10
                }
                else{
                    this.sItemprice = 5
                }
                this.totalprice = this.sItemprice
                console.log(this.totalprice);
                aReturn.push(`What size ${sInput} small or medium($2 extra) or large($3 extra) would you like?`);
                this.stateCur = OrderState.SIZE
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if (sInput == "small"){
                    this.sSizeprice = 0
                }
                else if (sInput == "medium"){
                    this.sSizeprice = 2
                }
                else{
                    this.sSizeprice = 3
                }
                this.totalprice = this.totalprice + this.sSizeprice
                console.log(this.totalprice);
                aReturn.push("What toppings would you like?");
                aReturn.push("cheese" + "=" + "$1");
                aReturn.push("onion" + "=" + "$1");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.FRIES
                this.sToppings = sInput;
                aReturn.push("Would you like fries yes($1) or no($0) with that?");
                if (sInput == "cheese"){
                    this.sToppingsprice = 1
                }
                else{
                    this.sToppingsprice = 1
                }
                this.totalprice = this.totalprice + this.sToppingsprice
                console.log(this.totalprice);
                break;
            case OrderState.FRIES:
                this.stateCur = OrderState.DRINKS
                if(sInput.toLowerCase() != "no"){
                    this.sFries = sInput;
                    this.sFriesprice = 1
                    this.totalprice = this.totalprice + this.sFriesprice
                    console.log(this.totalprice);
                    aReturn.push("Would you like drinks yes($1) or no($0) with that?");
                    break;
                }
                else{
                    this.sFriesprice = 0
                    this.totalprice = this.totalprice + this.sFriesprice

                }
                
            case OrderState.DRINKS:
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.sDrinksprice = 1
                    this.totalprice = this.totalprice + this.sDrinksprice
                    console.log(this.totalprice);
                
                }
                else{
                    this.sDrinksprice = 0
                    this.totalprice = this.totalprice + this.sDrinksprice

                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(`Drinks ${this.sDrinks}`);
                }
                if(this.sFries){
                    aReturn.push(`Fries ${this.sFries}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Total bill = ${this.totalprice}`);
                break;
        }
        return aReturn;
    }
}