const app = express();

app.set("port", process.env.PORT || 7872)

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(usuarioRouters);
app.use(function (req, res, next) {
    res.status(404).json({
        error: true,
        codigo: 404,
        message: "Endponit doesnt found"
    })

})

app.use(errorHandling);

module.exports = app ;