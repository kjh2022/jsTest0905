package youCanDoIt;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
//기능 만들어 넣어야 함
public class BoardDAO extends DAO {
	//싱글톤
	private static BoardDAO bd = new BoardDAO();
	
	//생성자
	private BoardDAO() {
	}
	public static BoardDAO getInstance() {
		return bd;
	}

	public List<Board> getBoardList() {
		List<Board> list = new ArrayList<>();
		String sql = "select * from tbl_board";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				Board brd = new Board();
				brd.setBno(rs.getInt("bno"));
				brd.setTitle(rs.getString("title"));
				brd.setContent(rs.getString("content"));
				brd.setWriter(rs.getString("writer"));
				brd.setCreationDate(rs.getString("creation_date"));
				list.add(brd);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return list;
	}

	public boolean deleteBoard(int bno) {
		String sql = "delete from tbl_board where bno = ?";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, bno);
			int rs = pstmt.executeUpdate();
			if(rs > 0)
				return true;
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return false;
	}

	public boolean insertBoard(Board board) {
		String sql = "insert into tbl_board values(seq_board + 1, ?,?,?,sysdate)";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, board.getTitle());
			pstmt.setString(2, board.getContent());
			pstmt.setString(3, board.getWriter());
			
			int rs = pstmt.executeUpdate();
			
			if(rs >0) {
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return false;
	}
}
