package youCanDoIt;

import java.sql.SQLException;
import java.util.List;
//기능 만들어 넣어야 함
public class BoardDAO extends DAO {

	public List<Board> getBoardList() {
		String sql = "";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean deleteBoard(int bno) {

		return false;
	}

	public boolean insertBoard(Board board) {

		return false;
	}
}
