var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var dir,
  startX,
  startY,
  offsetX,
  offsetY,
  startTime,
  endTime,
  duration,
  swipeLength,
  swipeAngle,
  swipeDirection;

const swipeTimeSpan = 100;
const swipeMinOffset = 100;
const swipeRestraint = 200;

const weekDays = [
  "",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MonYearTitle = (props) =>
  React.createElement(
    "div",
    { className: "monthYearTitleContainer" },
    React.createElement("div", { className: "monthWrap" }, props.month),
    React.createElement("div", { className: "yearWrap" }, props.year)
  );

const WeekdayTitle = () =>
  React.createElement(
    "div",
    { className: "weekdayTitleContainer" },
    React.createElement("div", { className: "weekWrap" }, "Sunday"),
    React.createElement("div", { className: "weekWrap" }, "Monday"),
    React.createElement("div", { className: "weekWrap" }, "Tuesday"),
    React.createElement("div", { className: "weekWrap" }, "Wednesday"),
    React.createElement("div", { className: "weekWrap" }, "Thursday"),
    React.createElement("div", { className: "weekWrap" }, "Friday"),
    React.createElement("div", { className: "weekWrap" }, "Saturday")
  );

class Daycells extends React.Component {
  calculateDays = (month, year) => {
    let numofDays = new Date(year, month, 0).getDate();
    let firstDay = new Date(year, month - 1, 1).getDay();

    let rows = [];
    let i = 0;

    while (i++ < firstDay) {
      rows.push({
        key: `blank${i}${Month}${Year}`,
        className: "cell blank",
        dayNum: "",
      });
    }
    let day = 1;

    while (day <= numofDays) {
      var flexOrder = day & (7 === 0) ? weekdays[7] : weekdays[day % 7];
      const styleName = `cell ${flexOrder}`;
      const id = `${day}${month}${year}`;
      rows.push({
        key: id,
        className: styleName,
        dayNum: day++,
      });
    }

    return rows;
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.Month !== nextProps.Month) {
      console.log("Month changed");
    }
  }
  handleDayClick = (id) => {
    if (id[0] === "b") return;
    {
      this.props.onDayClick(id);
    }
  };
  rrender() {
    const { month, year, dayIsClicked } = this.props;

    var currentMonthArr = this.calcDayCells(month, year);

    const renderCalendar = () => {
      return currentMonthArr.map((item) => {
        var style =
          item.key === dayIsClicked && item.key[8] !== "b"
            ? "dayNum selected"
            : "dayNum";
        return React.createElement(
          "div",
          {
            key: item.key,
            className: item.className,
            onClick: () => {
              this.handleDayClick(item.key);
            },
            onTouch: () => {
              this.handleDayClick(item.key);
            },
          },
          React.createElement(
            "span",
            {
              className: style,
            },
            item.dayNum
          )
        );
      });
      return React.createElement(
        "div",
        { className: "dayCellsContainer" },
        arr
      );
    };
    return (React.createElement("div", { className: "calendarWrap" }, renderCalendar(dayIsClicked)));
  }
}

class MonthControl extends React.Component {
  handleArrowClick(dir) {
    this.props.onArrowClick(dir);
  } 
  render() {
    const { dir } = this.props;
    return React.createElement('div', { className: 'arrowWrap' },React.createElement('div', { className: 'arrow', onClick: () => 
      this.handleArrowClick('left') }, '<'),React.createElement('div', { className: 'arrow', onClick: () => this.handleArrowClick('right') }, '>'));
  }
}

class Calender extends React.Component{
  constructor(props){
    super(props);
    let today = new Date();
    let defaultDay = today.getDate();
    let defaultMonth = today.getMonth() + 1;
    let defaultYear = today.getFullYear();
    let defaultDayClicked = `${defaultDay}${defaultMonth}${defaultYear}`;
    this.state = {
      Month: defaultMonth,
      Year: defaultYear,
      DayIsClicked: defaultDayClicked,
      prevMonth : undefined
    };
    this.handleDayClick = this.handleDayClick.bind(this); 
    this.handleMonthChange = this.handleMonthChange.bind(this);

  }

  handleDayClick(id){
    this.setState({DayIsClicked: id});
  }

  handleMonthChange = (dir) => {
    const { Month, Year } = this.state;
    if(dir === "left"){
      if(month === 1){
        this.setState({Month: 12, Year: Year - 1, prevMonth: 1});
      }else{
        this.setState({Month: Month - 1, prevMonth: Month});
      }
    }
    if(dir === "right"){
      if(Month === 12){
        this.setState({Month: 1, Year: Year + 1, prevMonth: 12});
      }else{
        this.setState({Month: Month + 1, prevMonth: Month});
      }
    }
  }
  handleSwipeEvent = (e, actions) => {
    const touchEventObj = e.changedTouches[0];
    if (actions === "start") {
      startX = touchEventObj.pageX;
      startY = touchEventObj.pageY;
      startTime = new Date().getTime();
    }else if (action === "end"){
      elapsedTime = new Date().getTime() - startTime;
      if(elapsedTime >= swipeTimeSpan){
        if(Math.abs (offsetX) >= swipeMinOffset && Math.abs (offsetY) <= swipeRestraint){
          this.handleMonthChange(swipeDirection);
        }
        offsetX = 0;
        offsetY = 0;
    }
  }else {
    offsetX = touchEventObj.pageX - startX;
    offsetY = touchEventObj.pageY - startY;
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      swipeDirection = offsetX > 0 ? "left" : "right";
    } else {  
      swipeDirection = offsetY > 0 ? "down" : "up";
    }
  }
    componentDidMount();{
      document.addEventListener('touchstart', function (){}, true);
    }
    render ();{
      const { month, year, dayIsClicked, prevMonth } = this.state; 
      function monthChangeComp(prevMonth, month){
        if (month === 12 && prevMonth === 1){
          return "carouseDec";
        }else{
          if (month > prevMonth){
            return "carouselInc";
        }else {
          return "carouselDec";
        }
      }
    };

    const transitionStyle = monthChangeComp(prevMonth, month);
    return (
      React.createElement('div', { className: 'calendarContainer' }, 
        React.createElement(MonYearTitle, { month: months[month], year: year }), 
        React.createElement(WeekdayTitle, null), React.createElement("div", { 
          className: "dayCellsViewPoint", ontouchstart: e => this. handleSwipeEvent(e, "move"), 
          ontouchEnd: e => this.handleSwipeEvent(e, "end")}, React.createElement(ReactCSSTransitionGroup, {
            className: "animOffset",
            transitionName: `${transitionStyle}`,
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
          }, React.createElement(DayCells, { key: `${month}${year}`, month: month, year: year, dayIsClicked: dayIsClicked, 
            onDayClick: this.handleDayClick })), React.createElement(MonthControl, { dir: "left", onArrowClick: this.handleMonthChange }), 
            React.createElement(MonthControls, {dir: "right", onArrowClick: this.handleMonthChange}) ))
    );
  }
}}

ReactDOM.render(React.createElement("div", null, React.createElement(Calender, null)), document.getElementById("app"));