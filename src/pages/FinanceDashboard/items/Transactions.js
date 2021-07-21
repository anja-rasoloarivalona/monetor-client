import React from "react";
import styled from "styled-components";
import { Title } from "./style";
import { useSelector } from "react-redux";
import { Select } from "../../../components/Form/WithoutValidation";
import { Amount, AppDate } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  margin-bottom: 1rem;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  > div:first-child {
    margin-right: 1rem;
  }
`;

const List = styled.ul`
  list-style: none;
    width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  ${(props) => {
    return {
      ".label__icon": {
        background: props.category.color,
      },
    };
  }}
`;

const ListItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ListItemLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItemLabelText = styled.div`
  font-size: 1.4rem;
`;

const ListItemLabelDate = styled.div`
  color: ${(props) => props.theme.grey};
`;

const ListItemIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 1rem;

  svg {
    color: ${(props) => props.theme.surface};
  }
`;

const ListItemAmount = styled.div`
  font-size: 1.4rem;
  height: 3rem;
  display: flex;
  align-items: flex-start;
`;

const Transactions = () => {
  const {
    text: { text },
    user: { transactions },
    categories,
    settings: { locale },
  } = useSelector((state) => state);

  return (
    <Container>
      <Header>
        <Title>{text.transactions}</Title>
      </Header>
      <Body>
        <List>
          {transactions.slice(0, 5).map((transaction) => {

                const label = transaction.type === "income" ?
                    categories.income.children[transaction.category.id].locale[locale].title :
                    categories.expense[transaction.category.parentId].children[transaction.category.id].locale[locale].title

            return (
              <ListItem key={transaction.id} category={transaction.category}>
                <ListItemInfo>
                  <ListItemIcon className="label__icon">
                    <FontAwesomeIcon icon={transaction.category.icon} />
                  </ListItemIcon>
                  <ListItemLabel>
                    <ListItemLabelText>
                      {label}
                    </ListItemLabelText>
                    <ListItemLabelDate>
                      <AppDate
                        value={new Date(transaction.date)}
                        format="mm dd"
                        month="short"
                      />
                    </ListItemLabelDate>
                  </ListItemLabel>
                </ListItemInfo>
                <ListItemAmount>
                  <Amount value={parseFloat(transaction.amount)} />
                </ListItemAmount>
              </ListItem>
            );
          })}
        </List>
      </Body>
    </Container>
  );
};

export default Transactions;
