import { Box, SimpleGrid } from "@chakra-ui/react";
import PizzaCard from "../pizza-card/PizzaCard";
import { useStore } from "../../../store/store";
// import { useStore } from "@/store/store";

// const pizzas = [
//   {
//     id: 1,
//     name: "Пепперони",
//     price: 500,
//     image: "https://via.placeholder.com/150",
//     ingredients: [
//       {
//         name: "Сыр моцарелла",
//         price: 50,
//       },
//       {
//         name: "Острый соус",
//         price: 30,
//       },
//       {
//         name: "Оливки",
//         price: 40,
//       },
//       {
//         name: "Доп. пеперони",
//         price: 70,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Маргарита",
//     price: 400,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Базилик",
//         price: 20,
//       },
//       {
//         name: "Помидоры черри ",
//         price: 40,
//       },
//       {
//         name: "Доп. сыр ",
//         price: 50,
//       },
//       {
//         name: "Песто ",
//         price: 30,
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Четыре сыра",
//     price: 550,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Горгонзола",
//         price: 60,
//       },
//       {
//         name: "Чеддер ",
//         price: 50,
//       },
//       {
//         name: "Сливочный соус  ",
//         price: 30,
//       },
//       {
//         name: "Грибы ",
//         price: 40,
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Гавайская",
//     price: 480,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Доп. ананас",
//         price: 30,
//       },
//       {
//         name: "Ветчина ",
//         price: 50,
//       },
//       {
//         name: "Острый соус  ",
//         price: 30,
//       },
//       {
//         name: "Моцарелла ",
//         price: 50,
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "Барбекю",
//     price: 530,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Курица",
//         price: 50,
//       },
//       {
//         name: "Бекон ",
//         price: 50,
//       },
//       {
//         name: "Лук ",
//         price: 20,
//       },
//       {
//         name: "Соус барбекю ",
//         price: 30,
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "Вегетарианская",
//     price: 450,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Баклажаны",
//         price: 40,
//       },
//       {
//         name: "Цукини ",
//         price: 40,
//       },
//       {
//         name: "Перец болгарский ",
//         price: 30,
//       },
//       {
//         name: "Брокколи ",
//         price: 30,
//       },
//     ],
//   },
//   {
//     id: 7,
//     name: "Мясная",
//     price: 560,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Салями",
//         price: 50,
//       },
//       {
//         name: "Бекон ",
//         price: 50,
//       },
//       {
//         name: "Курица ",
//         price: 50,
//       },
//       {
//         name: "Говядина ",
//         price: 70,
//       },
//     ],
//   },
//   {
//     id: 8,
//     name: "Дьябло",
//     price: 520,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Халапеньо",
//         price: 30,
//       },
//       {
//         name: "Острый соус  ",
//         price: 30,
//       },
//       {
//         name: "Доп. пепперони  ",
//         price: 70,
//       },
//       {
//         name: "Лук красный  ",
//         price: 20,
//       },
//     ],
//   },
//   {
//     id: 9,
//     name: "С грибами ",
//     price: 470,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Белые грибы ",
//         price: 50,
//       },
//       {
//         name: "Трюфельное масло   ",
//         price: 60,
//       },
//       {
//         name: "Шампиньоны ",
//         price: 40,
//       },
//       {
//         name: "Лук",
//         price: 20,
//       },
//     ],
//   },
//   {
//     id: 10,
//     name: "С морепродуктами",
//     price: 600,
//     image: "https://via.placeholder.com/150 ",
//     ingredients: [
//       {
//         name: "Креветки",
//         price: 80,
//       },
//       {
//         name: "Кальмары",
//         price: 70,
//       },
//       {
//         name: "Мидии ",
//         price: 60,
//       },
//       {
//         name: "Лимон",
//         price: 10,
//       },
//     ],
//   },
// ];

interface ListOfPizzasProps {
  isOpenModal: boolean;
  onOpenModal: (val: boolean) => void;
}

const ListOfPizzas: React.FC<ListOfPizzasProps> = ({
  isOpenModal,
  onOpenModal,
}) => {
  const setSelectedPizza = useStore((state) => state.setSelectedPizza);
  const selectedPizza = useStore((state) => state.selectedPizza);
  const currentPizzaId = useStore((state) => state.currentPizzaId);
  const pizzas = useStore((s) => s.pizzas);
  //    const [pizzas, setPizzas] = useState<IPizza[]>(pizzasData);
  console.log("currentPizzaId", currentPizzaId);
  return (
    <SimpleGrid columns={3} gap="20px" p={4} mt={4}>
      {pizzas.map((pizza) => (
        <Box
          key={pizza.id}
          onClick={() => {
            useStore.setState({ currentPizzaId: pizza.id });
            setSelectedPizza(pizza.id);
          }}
        >
          <PizzaCard
            isOpenModal={isOpenModal}
            onOpenModal={onOpenModal}
            key={pizza.id}
            pizzaId={pizza.id}
            imgSrc={pizza.image}
            price={pizza.price}
            title={pizza.name}
            ingredients={pizza.ingredients}
            // pizza={pizzas}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ListOfPizzas;
