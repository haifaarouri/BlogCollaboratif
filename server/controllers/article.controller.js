import Article from "../models/Article.js";

export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    return res.status(200).send(articles);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required !" });
    }
    const image = req.file ? req.file.filename : null;
    const userId = req.user.id;

    const newArticle = new Article({
      title,
      content,
      image,
      tags: tags?.split(",") || [],
      user: userId,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created!", article: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Failed to create article.", error });
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findById({ _id: req.params.id });

    if (article) {
      const newData = await Article.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Article updated successfully !" });
    } else {
      return res.status(404).json({ message: "Article not found !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById({ _id: req.params.id });

    if (article) {
      const newData = await Article.findByIdAndDelete(req.params.id);

      return res
        .status(200)
        .json({ message: "Article deleted successfully !" });
    } else {
      return res.status(404).json({ message: "Article not found !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};
