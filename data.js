// Mock data object used for LineChart and BarChart

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
    data: [
        50,
        20,
        2,
        86,
        71,
        100
    ],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    },{
    data: [
        20,
        10,
        4,
        56,
        87,
        90
    ]
    },{
    data: [
        30,
        90,
        67,
        54,
        10,
        2
    ]
    }]
}

// Mock data object used for Contribution Graph

const contributionData = [
    { date: '2016-01-02', count: 1 },
    { date: '2016-01-03', count: 2 },
    { date: '2016-01-04', count: 3 },
    { date: '2016-01-05', count: 4 },
    { date: '2016-01-06', count: 5 },
    { date: '2016-01-30', count: 2 },
    { date: '2016-01-31', count: 3 },
    { date: '2016-03-01', count: 2 },
    { date: '2016-04-02', count: 4 },
    { date: '2016-03-05', count: 2 },
    { date: '2016-02-30', count: 4 }
]

// Mock data object for Pie Chart

const pieChartData = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]

// Mock data object for Progress

const progressChartData = [0.4, 0.6, 0.8];


let person = {
    _id: 0,
    name: "Walter White",
    password: 'qwerty@143',
    income: 20000,
    totalExpenses: 9000,
    targetToSave: 4000,
    thisMonthStatus: -1200,
    savings: 231199,
    categoriesData: [
        {
            _id: 0,
            name: "Education",
            icon: '../assets/icons/education_icon.png',
            color: '#FFD572',
            totalExpenseInThis: 1000,
        },
        {
            _id: 1,
            name: "Nutrition",
            icon: '../assets/icons/food_icon.png',
            color: '#95A9B8',
            totalExpenseInThis: 2000,
        },
        {
            _id: 2,
            name: "Child",
            icon: '../assets/icons/baby_car_icon.png',
            color: '#008159',
            totalExpenseInThis: 3000,
        },
        {
            _id: 3,
            name: "Beauty & Care",
            icon: '../assets/icons/healthcare_icon.png',
            color: '#FF615F',
            totalExpenseInThis: 1000,
        },
        {
            _id: 4,
            name: "Sports",
            icon: '../assets/icons/sports_icon.png',
            color: '#8e44ad',
            totalExpenseInThis: 500,
        },
        {
            _id: 5,
            name: "Clothing",
            icon: '../assets/icons/cloth_icon.png',
            color: '#41B0FF',
            totalExpenseInThis: 1500,
        }
    ],
    expenses: [
        {
            id: 0,
            title: "Tuition Fee",
            description: "Allen",
            category: "Education",
            total: 300.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 1,
            title: "Arduino",
            description: "Easy Electronics",
            category: "Education",
            total: 20.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 2,
            title: "Javascript Books",
            category: "Education",
            description: "Udemy",
            total: 500.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 3,
            title: "PHP Books",
            description: "Coursera",
            category: "Education",
            total: 180.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 4,
            title: "Vitamins",
            description: "Medicine",
            category: "Nutrition",
            total: 1500.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 5,
            title: "Protein powder",
            description: "Protein",
            category: "Nutrition",
            total: 500.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 6,
            title: "Toys",
            description: "China maal",
            category: "Child",
            total: 1500.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 7,
            title: "Baby Car Seat",
            description: "Faltu cheez",
            category: "Child",
            total: 500.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 8,
            title: "Pampers",
            description: "Mummy poko pants",
            category: "Child",
            total: 600.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 9,
            title: "Baby T-Shirt",
            description: "T-Shirt",
            category: "Child",
            total: 400.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 10,
            title: "Skin Care product",
            description: "Lakme",
            category: "Beauty & Care",
            total: 100.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 11,
            title: "Lotion",
            description: "Lotion",
            category: "Beauty & Care",
            total: 500.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 12,
            title: "Face Mask",
            description: "fSociety",
            category: "Beauty & Care",
            total: 50.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 13,
            title: "Sunscreen cream",
            description: "Sunscreen cream",
            category: "Beauty & Care",
            total: 350.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 14,
            title: "Gym Membership",
            description: "Useless",
            category: "Sports",
            total: 450.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 15,
            title: "Gloves",
            description: "Black gloves",
            category: "Sports",
            total: 50.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 16,
            title: "T-Shirt",
            description: "HacktoberFest wali T-Shirt",
            category: "Clothing",
            total: 400.00,
            date: "13-12-2020",
            time: "4:20",
        },
        {
            id: 17,
            title: "Jeans",
            description: "D Mart",
            category: "Clothing",
            total: 1100.00,
            date: "13-12-2020",
            time: "4:20",
        },
    ]
}


export { data, contributionData, pieChartData, progressChartData, person }
