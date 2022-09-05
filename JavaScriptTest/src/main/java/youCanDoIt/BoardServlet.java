package youCanDoIt;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;


@WebServlet("/board")
public class BoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BoardServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/json;charset=utf-8");
		// 조회의 기능 구현.
		BoardDAO dao = BoardDAO.getInstance();
		List<Board> list = dao.getBoardList();
		JsonArray ary = new JsonArray();
		for (Board brd : list) {
			JsonObject obj = new JsonObject();
			obj.addProperty("bno" , brd.getBno());
			obj.addProperty("title" , brd.getTitle());
			obj.addProperty("content" , brd.getContent());
			obj.addProperty("writer" , brd.getWriter());
			obj.addProperty("creation_date", brd.getCreationDate());
			ary.add(obj);
		}
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(ary);
		response.getWriter().print(json);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/json;charset=utf-8");
		response.setCharacterEncoding("utf-8");

		// 추가, 삭제의 기능을 구현.
		String write = request.getParameter("write");
		if(write.equals("insert")) {
			Board brd = new Board();
			brd.setTitle(request.getParameter("title"));
			brd.setContent(request.getParameter("content"));
			brd.setWriter(request.getParameter("writer"));
			brd.setCreationDate(request.getParameter("creationDate"));
			BoardDAO dao = BoardDAO.getInstance();
			if(dao.insertBoard(brd)) {
				response.getWriter().print("success");
			}else {
				response.getWriter().print("fail");
			}
		}else if(write.equals("delete")) {
			Board board = new Board();
//			board.setBno(request.getParameter("bno"));
			
		}

	}

}
